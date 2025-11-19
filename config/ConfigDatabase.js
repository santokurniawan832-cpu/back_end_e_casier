// memanggil file .env config
require("dotenv").config()

class ConfigDatabase {
    constructor(){
        this.env = process.env.NODE_ENV || 'development';

        this.dbConfig = {
            development: {
                username: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || '',
                database: process.env.DB_NAME || 'database_development',
                host: process.env.DB_HOST || '127.0.0.1',
                dialect: process.env.DB_DIALECT || 'mysql'
            },
            production: {
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT
            },
            test: {
                username: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || '',
                database: process.env.DB_NAME || 'database_test',
                host: process.env.DB_HOST || '127.0.0.1',
                dialect: process.env.DB_DIALECT || 'mysql'
            }
            };
    }
    getDatabaseConfig() {
        return this.dbConfig;
    }

    getCurrentEnvConfig() {
        // mengembalikan default: development
        return this.dbConfig[this.env]; 
    }
}

module.exports = new ConfigDatabase();