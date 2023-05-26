const {createLogger, transports,format} = require("winston");

const customFormat = format.combine(format.timestamp({format: "DD-MM-YYYY HH:mm:ss"}),format.errors({stack: true}), format.printf((info)=>{
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message} `
}))

 
const logger = createLogger({
    format: customFormat,
    transports:[
        new transports.Console({
            prettyPrint: true,
        }),
        new transports.File({filename: 'logfile.log' })

    ]
});

module.exports = logger;