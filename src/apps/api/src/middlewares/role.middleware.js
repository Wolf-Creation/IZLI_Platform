export const roleMiddleware = (...allowedRoles) => {
  return (request, response, next) => {
    const role = request.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      return response.status(403).json({ success: false, message: 'Forbidden', errors: [] });
    }

    return next();
  };
};
