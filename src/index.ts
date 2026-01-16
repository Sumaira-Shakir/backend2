
import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import connectDB from './db/db.js';
import prodRoute from './routes/prod-route.js';
import userRoute from './routes/user-route.js';
import  {checkJwt}  from './middlware/checkJwt.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

console.log("Mongo URI:", process.env.MONGO_URI); // should print now
connectDB();

app.use('/api/users', userRoute);
app.use('/api/products', checkJwt, prodRoute);;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
