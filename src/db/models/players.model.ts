import { Model, Table, Column, DataType } from "sequelize-typescript";
import { Position } from "../../modules/football/interfaces/stats.interface";


@Table({
    tableName: "players",
})
export default class Player extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    })
    id: number;

    @Column({
        type: DataType.STRING(45),
        unique: 'uuid_UNIQUE',
        allowNull: false,
        field: "uuid"
    })
    uuid: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "teamId"
    })
    teamId: number;

    @Column({
        type: DataType.STRING(128),
        defaultValue: null,
        field: "firstName"
    })
    firstName?: string;

    @Column({
        type: DataType.STRING(128),
        defaultValue: null,
        field: "lastName"
    })
    lastName?: string;

    @Column({
        type: DataType.ENUM(...Object.values(Position)),
        defaultValue: null,
        field: "position"
    })
    position?: string;

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