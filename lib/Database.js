const mysql = require( 'mysql' );

class Database {

    constructor( config ) {
        this.connection = mysql.createConnection( config );

        this.connection.connect(err => {
            if (err) throw err;
            console.log("connected as id " + this.connection.threadId);
        });

    }

    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }

}

module.exports = Database;