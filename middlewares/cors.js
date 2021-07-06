const options = {
  origin: [
    'http://localhost:3000',
    'http://movies-morozova.nomoredomains.club',
    'https://movies-morozova.nomoredomains.club',
    'https://morozovaworld.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = { options };
