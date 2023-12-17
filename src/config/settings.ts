export const configs: any = {
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // models: [Item],
    autoLoadModels: true,
    synchronize: true,
    force: false,
    alter: true
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
