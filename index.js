const app = require('./src/app');
const pool = require('./src/pool');

pool
  .connect({
    user: 'postgres',
    host: 'localhost',
    database: 'refresh',
    password: 's159951s',
    port: 5432,
  })
  .then(() => {
    app().listen(3000, () => {
      console.log('server is on port ', 3000);
    });
  });
