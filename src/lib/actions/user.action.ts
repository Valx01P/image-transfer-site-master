"use server";

// user.actions.ts
import { revalidatePath } from "next/cache"; // Updated import
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { connectToDatabase } from "../database/index";

import { handleError } from '../utils'

import { CreateUserParams, UpdateUserParams } from '../../types'

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    handleError(error)
    return null; // Return null instead of throwing an error
  }
}


export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Find and delete all images associated with the user
    const deleteImagesResult = await Image.deleteMany({ user: userToDelete._id });

    console.log('Delete Images Result:', deleteImagesResult);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath('/');

    console.log('Deleted User:', deletedUser);

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
