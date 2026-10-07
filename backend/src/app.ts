import express, { urlencoded, type Request, type Response } from 'express';
import { NODE_ENV, PORT } from './config/env.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Todo-App Api 🗒️' });
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT} in ${NODE_ENV} mode 🚀`);
});
