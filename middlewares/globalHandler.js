const sendDevMessage = (err, res) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
    err: err,
  });
};
const sendUserMessage = (err, res) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
  });
};
/* @desc any error that happens in the middlewares
 will come to this handler through next() */

const globalHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == 'development') {
    sendDevMessage(err, res);
  } else {
    sendUserMessage(err, res);
  }
};
export default globalHandler;
