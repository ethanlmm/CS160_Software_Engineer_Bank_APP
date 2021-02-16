const MySQLEvent = require('@rodrigogs/mysql-events');
const mysql = require('mysql');
const config = require('./config/config.json')

const program = async() => {
    const connection = mysql.createConnection(config["mysql"]);
    const instance = new MySQLEvent(connection, {
        startAtEnd: true
    });
    await instance.start();
    instance.on(MySQLEvent.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(MySQLEvent.EVENTS.ZONGJI_error, console.error)
    console.log("Listener initialzied")
    instance.addTrigger({
        name: 'monitor',
        expression: 'cs160.APIResponses.*',
        statement: MySQLEvent.STATEMENTS.Insert,
        onEvent: async(e) => {
            console.log()

            const event = e["affectedRows"][0]["after"]

            process.send(JSON.stringify(event))

        }
    })
}
program()