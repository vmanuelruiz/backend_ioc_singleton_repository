import { Sequelize } from 'sequelize-typescript';
import { MonthPlayer, Player, SeasonPlayer, Team, WeekPlayer } from "./models";
import config from '../config';
import { APIError } from '../shared/errors/api-error';

class Database {
    public sequelize: Sequelize | undefined;

    constructor() { }

    async connectToDatabase() {
        try {
            const { mysql: { host, database, username, password, pool: { max, min, acquire, idle } } } = config;

            this.sequelize = new Sequelize({
                database,
                username,
                password,
                host,
                dialect: 'mysql',
                pool: {
                    max,
                    min,
                    acquire,
                    idle
                },
                models: [Team, Player, WeekPlayer, SeasonPlayer, MonthPlayer],
                define: {
                    timestamps: false
                },
                logging: false
            });

            Team.hasMany(Player, {
                foreignKey: 'teamId',
            });
            Player.belongsTo(Team);

            Player.hasMany(MonthPlayer);
            MonthPlayer.belongsTo(Player, {
                foreignKey: 'playerId',
            });

            Player.hasMany(SeasonPlayer);
            SeasonPlayer.belongsTo(Player, {
                foreignKey: 'playerId',
            });

            Player.hasMany(WeekPlayer);
            WeekPlayer.belongsTo(Player, {
                foreignKey: 'playerId',
            });

            await this.sequelize.authenticate();
        } catch (err) {
            throw new APIError("Unable to connect to the MySQL Database");
        }

    }
}

export default new Database();