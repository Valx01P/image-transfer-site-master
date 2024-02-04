import { Schema, models, model, Document } from "mongoose";

export interface IImage extends Document {
  user: string; // Reference to the User model
  filename: string;
  path: string;
  uploadedAt: Date;
}

const ImageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Image = models.Image || model<IImage>("Image", ImageSchema);

export default Image;
