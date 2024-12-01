const mongoose = require('mongoose');
const uri = 'mongodb+srv://sebindream:<Lsbdream58*>@cluster0.oj6ek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Your existing server setup code
const express = require('express');
const app = express();
const port = 5001;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
