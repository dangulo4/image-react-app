const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');

// initialize app with express
const app = express();
// connect DB
connectDB();
// middleware
app.use(express.json({ extended: false }));
// test request end point
app.get('/', (req, res) => res.send('API is running'));
// initialize fileUpload
app.use(fileUpload());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/images', require('./routes/api/images'));
app.use('/api/posts', require('./routes/api/posts'));

// variable to hold environment
const PORT = process.env.PORT || 5000;

// Upload endpoint
app.post('/upload', (req, res) => {
  // check to see if request is null
  if (req.files === null) {
    return res.status(400).json({ msg: 'No File Uploaded' });
  }
  // create variable to hold the request file object
  const file = req.files.file;

  // move file to the client folder 'react'
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    // send file name and path
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server is now listening on PORT ${PORT}!`);
});
