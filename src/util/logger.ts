import moment from 'moment'
import winston from 'winston'
import { Request } from 'express'
import { LOGGER_LEVEL, DATE_FORMAT, ENVIROMENT } from '../shared/constants'
import config from '../config'

export const isLocalOrTestEnv = () => ([ENVIROMENT.LOCAL, ENVIROMENT.TEST].includes(config.env));

const consoleTransport = new winston.transports.Console({ stderrLevels: [] })
const winstonLogger = winston.createLogger(_getWinstonOptions())

function _getWinstonOptions() {
    const level = _getLevel()

    const result = {
        level,
        format: _prodWinstonFormat(),
        transports: [consoleTransport],
    }

    if (isLocalOrTestEnv()) {
        result.format = _localWinstonFormat()
    }

    return result
}

function _prodWinstonFormat() {
    return winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, timestamp, message }) => `${[timestamp]} | ${level}: ${message}`),
    )
}

function _localWinstonFormat() {
    return winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, timestamp, message }) => `${[timestamp]} | ${level}: ${message}`),
    )
}

function _getLevel() {
    return LOGGER_LEVEL[config.env as keyof typeof LOGGER_LEVEL] || LOGGER_LEVEL.prod // For prod use warning level: https://github.com/winstonjs/winston#logging-levels
}

const _log = (type: string): any => {
    const func = winstonLogger[type as keyof winston.Logger] || winstonLogger.info

    return func.bind(winstonLogger)
}

const _errorsLog = (message: string, errors?: any[] | Record<string, any>) => {
    if (!errors || !errors.length) {
        return _log('error')(message)
    }

    errors.forEach((error: any) => {
        const customMessage = `${message}: '${error.param}' ${error.msg} - Input value '${error.value}'`
        _log('error')(customMessage)
    })
}

const _debugLog = (req: Request) => {
    const date = moment().format(DATE_FORMAT.FULL_US_DATETIME_FORMAT)
    const data = {
        date,
        initTime: new Date().getTime(),
        method: req.method,
        url: req.originalUrl,
    }

    _log('debug')(JSON.stringify(data))
}

export const logger = {
    request: _debugLog,
    debug: _log('debug'),
    warn: _log('warn'),
    info: _log('info'),
    error: _log('error'),
    errors: _errorsLog,
}
