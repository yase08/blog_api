module.exports = {
  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASE_NAME || "blog",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_USER_PW || "Ayasbogor123_",
      port: process.env.POSTGRES_PORT || 5432,
      host: process.env.POSTGRES_HOST || "localhost",
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
