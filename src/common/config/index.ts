import { configDev } from './config.dev'
import { configProd } from './config.prod'

/**
 * 设置环境变量
 * export NODE_ENV=****
 */
const env = process.env.NODE_ENV || 'dev'
const config: any = {...env === 'dev' ? configDev : configProd}

export default config
