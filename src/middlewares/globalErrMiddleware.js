const globalErrMiddleware = (err, req, res, next) => {
  res
    .status(err.status || 400)
    .json({ message: err.message, status: err.status });
};
export default globalErrMiddleware;
