import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const logMessage = `${req.method} ${req.url} - ${new Date().toLocaleString()}`;
  console.log(logMessage);
  next();
};

export default logger;