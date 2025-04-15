import ImageModel from '../models/image.model.js'

export const imageUpload = async (req, res, next) => {

    try {
        // Get Cloudinary URL from uploaded file
        const imageUrl = req.file.path;
        // Save imageUrl to MongoDB (example using Mongoose)
        const newImage = new ImageModel({ url: imageUrl });
        await newImage.save();
        console.log( newImage )
        res.status(201).json({ url: imageUrl });
      } catch (err) {
        next(err);
      }
}