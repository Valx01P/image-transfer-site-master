"use server";

// image.actions.ts
import { NextApiRequest, NextApiResponse } from "next";
import Image from "../../database/image.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";

export const uploadImage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    connectToDatabase();

    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Handle image upload and save relevant information in the database
    const { filename, path } = req.body; // Assuming you handle file uploads

    const newImage = new Image({
      user: userId,
      filename,
      path,
    });

    await newImage.save();

    // Associate the image with the user
    user.images.push(newImage._id);
    await user.save();

    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteImage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    connectToDatabase();

    const imageId = req.query.id as string;

    await Image.findByIdAndDelete(imageId);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getImageById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    connectToDatabase();

    const imageId = req.query.id as string;

    const image = await Image.findById(imageId);

    if (!image) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    res.status(200).json(image);
  } catch (error) {
    console.error("Error getting image by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllImages = async (
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    connectToDatabase();

    const images = await Image.find();

    res.status(200).json(images);
  } catch (error) {
    console.error("Error getting all images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};