const sendErrorDev = (err, res, req) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res, req) => {
  if (err.isOperational) {

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

  } else {
    console.error('ERROR 💥', err);
    
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports= (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res, req);
  } else if (
    process.env.NODE_ENV === 'production' 
  ) {
    let error = { ...err };
    error.message = err.message;
    sendErrorProd(error, res, req);
  }
};
