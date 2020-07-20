const express = require('express');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/connectDB');

const app = express();

app.use(express.json());

//connect to db
connectDB();

app.use('/api/users', userRoute);

app.listen(5000, () => {
  console.log('server started');
});
