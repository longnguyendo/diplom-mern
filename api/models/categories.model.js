import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  categories: [{
    category: String
  }],

});

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;