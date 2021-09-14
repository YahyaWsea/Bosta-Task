module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Bosta-Task',
    version: '1.0.0',
    description:
      'This is a REST API server made with Express. It monitors url that users want to trigger, this is as a task required by Bosta.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Development server',
    },
  ],
};
