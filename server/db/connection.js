const { Pool, Client } = require( 'pg' );

const pool = new Pool( {
    user: 'flaunt',
    host: 'localhost',
    database: 'flaunt',
    password: 'flaunt',
    port: 5432,
} );


module.exports = {
    pool: () => pool,
    query: ( text, params ) => pool.query( text, params ),
};