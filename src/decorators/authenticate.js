const authenticate = async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
};

export { authenticate };
