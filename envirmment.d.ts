declare namespace NodeJS {
  export interface ProcessEnv {
    RABBITMQ_AUTH_QUEUE: string;
    MONGODB_HOST: string;
    MONGODB_USER: string;
    MONGODB_PASS: string;
    MONGODB_PORT: string;
    MONGODB_DB_NAME: string;
  }
}
