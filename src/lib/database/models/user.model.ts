import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  photo: { type: String, required: true },
})

const User = models.User || model('User', UserSchema);

export default User;

// import { Schema, models, model, Document } from "mongoose";

// export interface IUser extends Document {
//   clerkId: string;
//   name: string;
//   username: string;
//   email: string;
//   password?: string;
//   picture: string;
//   joinedAt: Date;
// }

// const UserSchema = new Schema({
//   clerkId: { type: String, required: true },
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   joinedAt: { type: Date, default: Date.now },
// });

// const User = models.User || model<IUser>("User", UserSchema);

// export default User;
