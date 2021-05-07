const express = require('express');
const router = express.Router();

const Image = require('../../models/Image');

//@route Image api/images
//@desc Move image
//@access Public
router.post('/upload', (req, res) => {
  // check to see if request is null
  if (req.files === null) {
    return res.status(400).json({ msg: 'No File Uploaded' });
  }
  // create variable to hold the request file object
  const file = req.files.file;
  console.log(file);

  // move file to the client folder 'react'
  file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // send file name and path
    res.json({ fileName: file.name, filePath: `uploads/${file.name}` });
  });
});

//@route Image api/images
//@desc Create a image
//@access Public

module.exports = router;
