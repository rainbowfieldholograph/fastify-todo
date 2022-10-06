async function authenticate(request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
}

export { authenticate };
