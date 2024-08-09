import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "teams",
})
export default class Team extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id: number;

  @Column({
    type: DataType.STRING(45),
    unique: true,
    allowNull: false,
    field: "uuid"
  })
  uuid: string;

  @Column({
    type: DataType.STRING(64),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING(64),
    field: "shortName"
  })
  shortName?: string;

  @Column({
    type: DataType.STRING(3),
    field: "abbr"
  })
  abbr?: string;

  @Column({
    type: DataType.DATE(),
    allowNull: false,
    field: "added"
  })
  added: Date;

  @Column({
    type: DataType.DATE(),
    allowNull: false,
    field: "updated"
  })
  updated: Date;

}