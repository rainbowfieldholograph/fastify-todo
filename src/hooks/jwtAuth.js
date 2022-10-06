function jwtAuth(request, reply, next) {
  const server = this;

  request.jwt = server.jwt;

  return next();
}

export { jwtAuth };
