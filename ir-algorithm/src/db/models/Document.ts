import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../../src/config/dbConnection"
interface DocumentAttributes {
  id?: number,
  name?: string | null,
  content?: string | null,
  docClass?: string | null,

  createdAt?: Date,
  updatedAt? : Date
}

export interface DocumentInput extends Optional<DocumentAttributes, 'id'>{ }
export interface DocumentOutput extends Required<DocumentAttributes>{ }

class Document extends Model<DocumentAttributes, DocumentInput> implements DocumentAttributes {
  public id!: number;
  public name!: string;
  public content!: string;
  public docClass!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

Document.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name:{
    type: DataTypes.STRING,
    allowNull: true
  },
  content:{
    type: DataTypes.STRING,
    allowNull: true
  },
  docClass:{
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default Document;