import { Schema, models, model, Document } from "mongoose";

export interface IImage extends Document {
  _id: string;
  uploadedAt: Date;
  imageUrl: string;
  user: { _id: string, firstName: string, lastName: string }; // Reference to the User model
}

const ImageSchema = new Schema({
  uploadedAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

const Image = models.Image || model("Image", ImageSchema);

export default Image;
