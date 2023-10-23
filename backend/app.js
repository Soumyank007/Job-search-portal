const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected'))
.catch((err) => console.log(err));

// Configure middleware
app.use(cors());

// Use Morgan for request logging
app.use(morgan('dev'));

// Use Body-Parser for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES MIDDLEWARE
app.use('/api', authRoutes);

// error middleware
app.use(errorHandler);

app.use(cookieParser());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
