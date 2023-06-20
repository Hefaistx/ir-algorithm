import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME as string;
const dbUsername= process.env.DB_USERNAME as string;
const dbPassword= process.env.DB_PASSWORD;
const dbDialect= "mysql";

console.log(dbHost, dbName, dbUsername, dbPassword, dbDialect);

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect
})

if(sequelizeConnection){
   console.log(dbHost, dbName, dbUsername, dbPassword, dbDialect);
}else{
    console.log('error');
}

export default sequelizeConnection;