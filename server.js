const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
// initialize app with express
const app = express();
// connect DB
connectDB();
// middleware
app.use(express.json({ extended: false }));

// initialize fileUpload
app.use(fileUpload('uploads'), require('./routes/api/images'));

// test request end point
app.get('/', (req, res) => res.send('API is running'));

app.use('/api/images', require('./routes/api/images'));
// app.use(express.static('uploads'), require('./routes/api/images'));

// variable to hold environment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌎 ==> Server is now listening on PORT ${PORT}!`);
});
