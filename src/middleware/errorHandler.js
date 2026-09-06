import { HttpError } from 'http-errors';


export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    const { status = 500 } = err;
    return res.status(status).json({
      message: err.message || err.name
    });
  }

  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'Something went wrong.' : err.message;
  res.status(500).json({message});
};
