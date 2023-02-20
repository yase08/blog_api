module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DATABASE_NAME || "kuning_db",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_USER_PW || "QYS3QYS3",
      port: process.env.POSTGRES_PORT || 5432,
      host: process.env.POSTGRES_HOST || "localhost",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
    ssl: {
      rejectUnathorized: false,
    },
  },
};
