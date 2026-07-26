export const notFoundMiddleware = (_request, response) => {
  response.status(404).json({
    success: false,
    message: 'Route not found',
    errors: [],
  });
};

export const errorMiddleware = (error, _request, response, _next) => {
  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    errors: error.errors || [],
  });
};
