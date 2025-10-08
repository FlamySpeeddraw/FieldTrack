const http = require('http');
const app = require('./src/app');
require("dotenv").config();

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});