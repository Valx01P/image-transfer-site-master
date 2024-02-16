"use server";

// user.actions.ts
import { revalidatePath } from "next/cache"; // Updated import
// import { FilterQuery } from "mongoose";
import User from "../../database/user.model";
import Image from "../../database/image.model";
import { connectToDatabase } from "../mongoose";
import { IUser } from "../../database/user.model";

/**
 * Common interfaces used in actions
 */
interface ClerkId {
  clerkId: string;
}

interface UserId {
  userId: string;
}

interface Path {
  path: string;
}

/**
 * Interfaces for user actions
 */
export interface CreateUserParams extends ClerkId {
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams extends UserId {}

export interface UpdateUserParams extends ClerkId, Path {
  updateData: Partial<IUser>;
}

export interface DeleteUserParams extends ClerkId {}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}


export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    revalidatePath(path);
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    await Image.deleteMany({ user: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function getAllUsers(params: GetAllUsersParams) {
//   try {
//     connectToDatabase();

//     const { page = 1, pageSize = 10, searchQuery } = params;

//     // Calculate the number of users to skip based on the page number and page size
//     const skipAmount = (page - 1) * pageSize;

//     const query: FilterQuery<typeof User> = {};

//     if (searchQuery) {
//       query.$or = [
//         { name: { $regex: new RegExp(searchQuery, "i") } },
//         { username: { $regex: new RegExp(searchQuery, "i") } },
//       ];
//     }

//     const users = await User.find(query)
//       .sort(sortOptions)
//       .skip(skipAmount)
//       .limit(pageSize);

//     const totalUsers = await User.countDocuments(query);

//     const isNext = totalUsers > skipAmount + users.length;

//     return { users, isNext };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export async function getUserImages(params: GetUserByIdParams) {
//   try {
//     connectToDatabase();

//     const { userId, page = 1, pageSize = 10 } = params;

//     const userImages = await Image.find({ user: userId })
//       .skip((page - 1) * pageSize)
//       .limit(pageSize);

//     return userImages;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
