/* eslint-disable no-console */
/* eslint-disable max-len */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import { tryCatch } from './middlewares/tryCatch';
import { router } from './routes/routes';

const port = 4444;

mongoose.connect('mongodb+srv://app:admin@cluster1.hhizpmg.mongodb.net/RegistrationApp?retryWrites=true&w=majority')
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const app = express();

app.use(cors());
app.use(express.text());
// app.use(tryCatch);
app.use(router);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close();
  });
});
