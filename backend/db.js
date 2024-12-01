const mongoose = require('mongoose');

const uri = 'mongodb+srv://sebindream:Lsbdream58%2A@cluster0.mongodb.net/sample_mflix?retryWrites=true&w=majority&directConnection=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit on connection failure
  });


// Your existing server setup code
const express = require('express');
const app = express();
const port = 5001;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
