const http = require('http');
const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const { debug } = require('console');
const { readdir } = require('fs');

// Load environment variables from.env file
require('dotenv').config()

// Database connection
require('./connection/connection')

// Express app setup
const app = express()

const port = process.env.PORT || 3000

// Express server config
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(`/api/auth`, require(`./routes/UserRoutes`))
app.use(`/api/blog`, require(`./routes/BlogRoutes`))

app.use('/', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} this api url is not found provide valid api url`, success: false })
})

// Express server
const httpServer = http.createServer(app);

// Start server
httpServer.listen(port);

// HTTP server to redirect to HTTPS
httpServer.on('error', onError);
httpServer.on('listening', onListening);

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port == 'string' ? 'pipe ' + port : 'port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr == 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Server is running on ' + bind);
}
