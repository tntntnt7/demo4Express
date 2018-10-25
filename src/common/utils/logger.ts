import * as log4js from 'log4js'
import * as fs from 'fs'
import config from '../config'

class Log {
  public logger: log4js.Logger

  constructor() {
    if (!fs.existsSync('./logs')) { fs.mkdirSync('./logs') }
    if (!config.debug) {
      log4js.configure({
        appenders: {
          out: { type: 'file', filename: './logs/out.log' },
          errors: { type: 'dateFile', filename: './logs/error.log' },
          justErrors: { type: 'logLevelFilter', appender: 'errors', level: 'error' },
        },
        categories: {
          default: { appenders: ['out', 'justErrors'], level: 'info' },
        },
      })
      this.logger = log4js.getLogger('out')
    } else {
      this.logger = log4js.getLogger()
      this.logger.level = 'debug'
    }
  }
}

const logger = new Log().logger

export default logger
