// shared.types.d.ts
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
