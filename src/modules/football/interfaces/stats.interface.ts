/** Time frame requested - [week, month, season] */
export enum Period {
    WEEK = 'week',
    MONTH = 'month',
    SEASON = 'season'
};

/** Player position */
export enum Position {
    GK = 'GK',
    DEF = 'DEF',
    MID = 'MID',
    FOR = 'FOR'
};

export interface Stat {
    /** Name of the players current team */
    teamName: string;

    /** Players save bonus tier 2 in the requested period */
    savesTier2: number,

    /** Player last name */
    lastName: string,

    /** Players save bonus tier 1 in the requested period */
    savesTier1: number,

    /** Players substitute appearances in the requested period */
    subs: number,

    /** Players man of the match awards in the requested period */
    motms: number,

    /** Players points scored in the requested period */
    points: number,

    /** Players red cards received in the requested period */
    redCards: number,

    /** Players goals conceded in the requested period */
    concedes: number,

    /** Players assists in the requested period */
    assists: number,

    /** Players shots bonus tier 1 in the requested period */
    shotsTier1: number,

    /** Players shots bonus tier 2 in the requested period */
    shotsTier2: number,

    /** Player identifier */
    id: number,

    /** Players match starts in the requested period */
    starts: number,

    /** Players goals scored in the requested period */
    goals: number,

    /** Players tackles bonus tier 1 in the requested period */
    tacklesTier1: number,

    /** Players tackles bonus tier 2 in the requested period */
    tacklesTier2: number,

    /** Players own goals scored in the requested period */
    ownGoals: number,

    /** Players cleansheets in the requested period */
    cleansheets: number,

    /** Players penalty saves in the requested period */
    penSaves: number,

    /** Player first name - empty string for someone like Willian */
    firstName: string,

    /** Players penalties missed in the requested period */
    penMisses: number,

    /** Players passes bonus tier 1 in the requested period */
    passesTier1: number,

    position: Position,

    /** Players passes bonus tier 2 in the requested period */
    passesTier2: number,

    /** Players yellow cards received in the requested period */
    yellowCards: number
}

export interface StatsResponse {
    period: Period;
    stats: Stat[];
}

export interface QueryParams {
    /** 
     * When period set to 'week' - specifies the ID of the week to return [1-37]
     * @isInt
     */
    weekId?: number;

    /** 
     * When period set to 'month' - specifies the ID of the month to return [1-12] 
     * @isInt
     */
    monthId?: number;
}