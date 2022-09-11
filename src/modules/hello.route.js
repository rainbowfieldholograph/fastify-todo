const helloRoute = async (server, options) => {
  const getHello = async () => {
    return {
      hello: 'world',
    };
  };

  server.get('/', getHello);
};

export { helloRoute };
