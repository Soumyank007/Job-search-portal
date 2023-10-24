const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const errorHandler = require("./middleware/error");


// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');

app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

// Configure middleware
const corsOptions = {
  origin: 'https://job-search-portal-ashy.vercel.app',
  credentials: true 
};
app.use(cors(corsOptions));

// Use Morgan for request logging
app.use(morgan('dev'));

// Use Body-Parser for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
