const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    filePath: String,
  },
  {
    timestamp: true,
  }
);

//Image is a model which has a schema imageSchema
module.exports = Image = mongoose.model('image', ImageSchema);
