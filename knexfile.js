module.exports = {
  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER_PW,
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    },
    migrations: {
      directory: process.env.MIGRATIONS,
    },
    seeds: {
      directory: process.env.SEEDS,
    },
  },

  production: {
    client: process.env.CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: process.env.MIGRATIONS,
    },
    seeds: {
      directory: process.env.SEEDS,
    },
    ssl: {
      rejectUnathorized: false,
    },
  },
};
