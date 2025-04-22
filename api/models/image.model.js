import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({

  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String, 
  }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;