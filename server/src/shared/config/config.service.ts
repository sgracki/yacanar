import Joi from 'joi';
import dotenv from 'dotenv';
import * as fs from 'fs';
import _ from 'lodash';

export interface EnvVariables {
    NODE_ENV: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE_NAME: string;
    DB_PORT: number;
    SERVER_PORT: number;
    SERVER_HOST: string;
}

export interface EnvConfig {
    isDev: boolean;
    isProd: boolean;
    isTest: boolean;
}

export interface ServerConfig {
    port: number;
}

export interface DBConfig {
    username: string;
    password: string;
}

export interface AppConfig {
    env: EnvConfig;
    db: DBConfig;
    server: ServerConfig;
}

type ConfigKeys = keyof AppConfig;
export class ConfigService {

    private readonly appConfig: AppConfig;
    private readonly envSchema: Joi.ObjectSchema = Joi.object({
        NODE_ENV: Joi.string()
            .valid('development', 'production', 'test')
            .default('development'),
        SERVER_PORT: Joi.number().default(3000),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().default(''),
    });
    private config = {};

    constructor(envFileContent: string) {
        const config = dotenv.parse(envFileContent);
        this.appConfig = this.createConfig((this.validateInput(config) as any));
    }

    private createConfig(envVariables: EnvVariables): AppConfig {
        return {
            ...this.config,
            server: {
                port: envVariables.SERVER_PORT,
            },
            db: {
                username: envVariables.DB_USERNAME,
                password: envVariables.DB_PASSWORD,
            },
            env: {
                isDev: envVariables.NODE_ENV === 'development',
                isProd: envVariables.NODE_ENV === 'production',
                isTest: envVariables.NODE_ENV === 'test',
            },
        };
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const { error, value: validated } = Joi.validate(envConfig, this.envSchema);

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        return validated;
    }

    public getConfigFor<T extends ConfigKeys>(key: T) {
        return this.appConfig[key];
    }

    public get<T>(path: string[] | string): T {
        return _.get(this.appConfig, path);
    }

}
