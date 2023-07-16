
/**
 * Application Logger
 * @namespace app-packages/logger
 * 
 */const { transports, createLogger, format } = require('winston');

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: "logs/general-backend.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error-backend.log",
    })
  ],
})

/**
 * Application Logger
 * @module app-packages/logger
 */
module.exports = logger;