declare const process: {
    env: Record<string, any>;
};

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mysql: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    redis: {
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
}