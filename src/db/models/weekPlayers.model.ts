import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "weekPlayers",
})
export default class WeekPlayer extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "weekId"
    })
    weekId: number;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "playerId"
    })
    playerId: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "points"
    })
    points?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "starts"
    })
    starts?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "subs"
    })
    subs?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "goals"
    })
    goals?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "ownGoals"
    })
    ownGoals?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "assists"
    })
    assists?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "concedes"
    })
    concedes?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "cleansheets"
    })
    cleansheets?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "redCards"
    })
    redCards?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "yellowCards"
    })
    yellowCards?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "penSaves"
    })
    penSaves?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "penMisses"
    })
    penMisses?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "savesTier1"
    })
    savesTier1?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "savesTier2"
    })
    savesTier2?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "passesTier1"
    })
    passesTier1?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "passesTier2"
    })
    passesTier2?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "tacklesTier1"
    })
    tacklesTier1?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "tacklesTier2"
    })
    tacklesTier2?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "shotsTier1"
    })
    shotsTier1?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "shotsTier2"
    })
    shotsTier2?: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: "motms"
    })
    motms?: number;

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