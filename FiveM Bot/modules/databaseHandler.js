global.conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: global.config.db_password,
  database: global.config.db_name
});

conn.connect(function(err) {
  if (err){ console.log(err)}else{console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mDatabase connection estabilished \x1b[0m');};
  function handleDisconnect(conn) {
		conn.on('error', function(err) {
			if (!err.fatal) {
			  return;
			}

			if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
			  throw err;
			}

			console.log('Re-connecting lost connection: ' + err.stack);

			global.conn = mysql.createConnection(conn.config);
			handleDisconnect(conn);
			conn.connect();
		});
	}
	handleDisconnect(conn);
});


console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded databaseHandler \x1b[0m');