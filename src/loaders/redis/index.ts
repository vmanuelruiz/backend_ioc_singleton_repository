import { createClient } from 'redis';
import config from '../../config';

const { password, host, port } = config.redis

export const redisClient = createClient({
    password,
    socket: {
        host,
        port: parseInt(port || '6379', 10)
    }
});