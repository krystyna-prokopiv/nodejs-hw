
export const errorHandler = ((err, req, res, next) => {
    const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json(isProd ? "Something went wrong." : err.message);
});