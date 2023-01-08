
const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
// const {errorHandler}  = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');


connectDB();

const apps = express();

apps.use(express.json());
apps.use(express.urlencoded({ extended: false }));

apps.use('/api/goals', require('./routes/goalRoutes'));
apps.use('/api/users', require('./routes/userRoutes'));

// Serve frontend


// if (process.env.NODE_ENV === 'production') {
//   apps.use(express.static(path.join(__dirname, '../frontend/build')));

//   apps.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, './', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   apps.get('/', (req, res) => res.send('Please set to production'));
// }

// apps.use(errorHandler);
const port = process.env.PORT || 5000;
apps.listen(port, () => console.log(`Server started on port ${port}`));