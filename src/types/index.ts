// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }

  //

  // ====== IMAGE PARAMS
export type CreateImageParams = {
    userId: string
    image: {
      imageUrl: string
    }
    path: string
  }
  
  export type DeleteImageParams = {
    imageId: string
    path: string
  }

  export type GetImagesByUserParams = {
    userId: string
  }
  
  export type Image = {
    _id: string
    imageUrl: string
    user: {
      _id: string
      firstName: string
      lastName: string
    }
  }
  