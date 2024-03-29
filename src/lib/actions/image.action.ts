"use server";

// image.actions.ts
import { revalidatePath } from 'next/cache'
import Image from "../database/models/image.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/index";

import { handleError } from '../utils'

import {
  CreateImageParams,
  DeleteImageParams,
  GetImagesByUserParams,
} from '../../types'


// CREATE
export async function createImage({ userId, image, path }: CreateImageParams) {
  try {
    await connectToDatabase();

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Create image with user reference
    const newImage = await Image.create({ ...image, user: userId });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
    return null;
  }
}

// DELETE
export async function deleteImage({ imageId, path }: DeleteImageParams) {
  try {
    await connectToDatabase()

    const deletedImage = await Image.findByIdAndDelete(imageId)
    if (deletedImage) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES BY USER
export async function getImagesByUser({ userId }: GetImagesByUserParams) {
  try {
    await connectToDatabase();

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Find all images associated with the user
    const images = await Image.find({ user: userId });

    // Return the images in a variable called 'data'
    const data = images.map((image) => JSON.parse(JSON.stringify(image)));
    
    return { data };
  } catch (error) {
    // handleError(error);
    return { data: 
      [
        {
          _id: "1",
          uploadedAt: new Date(),
          imageUrl: "https://via.placeholder.com/150",
          user: { _id: "1", firstName: "John", lastName: "Doe" }
        }
      ]
     };
  }
}

// _id: string;
// uploadedAt: Date;
// imageUrl: string;
// user: { _id: string, firstName: string, lastName: string }; // Reference to the User model

