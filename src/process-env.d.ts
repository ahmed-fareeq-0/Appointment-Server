export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_TYPE: string;
            DB_PORT: number;
            DB_HOST: string;
            DB_NAME: string;
            DB_USER: string;
            DB_PASS: string;
        }
    }
}

