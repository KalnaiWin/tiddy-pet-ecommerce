import { ENV } from "./env.js";
import { createClient } from "redis";
import type { RedisClientType } from "redis";

let client: RedisClientType | null = null;

const statusRedis = {
  CONNECT: "connect",
  END: "end",
  RECONNECT: "reconnecting",
  ERROR: "error",
};

const handleEventConnection = (redisClient: RedisClientType) => {
  redisClient.on(statusRedis.CONNECT, () => {
    console.log("Redis connected");
  });

  redisClient.on(statusRedis.END, () => {
    console.log("Redis disconnected");
  });

  redisClient.on(statusRedis.RECONNECT, () => {
    console.log("Redis reconnecting...");
  });

  redisClient.on(statusRedis.ERROR, (err) => {
    console.error("Redis error:", err);
  });
};

export const initRedis = async (): Promise<RedisClientType> => {
  if (client) return client;

  client = createClient({
    username: "default",
    password: ENV.REDIS_PASSWORD,
    socket: {
      host: ENV.SOCKET_HOST,
      port: ENV.SOCKET_PORT,
    },
  });

  handleEventConnection(client);

  await client.connect();

  return client;
};

export const getRedis = (): RedisClientType => {
  if (!client) {
    throw new Error("Redis not initialized. Call initRedis() first.");
  }
  return client;
};

export const closeRedis = async (): Promise<void> => {
  if (client) {
    await client.quit();
    client = null;
    console.log("🛑 Redis connection closed");
  } 
};
