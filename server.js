import http from 'http';
import app from './app/app.js';



//create the server
//using node js called modules & pass the express application
const server =http.createServer(app)

//declare PORT locally & for business 
const PORT = process.env.PORT || 7000

//listen to the server & pass in the PORT  used console.log to see if the server running
server.listen(PORT , console.log(`server is up and running on port ${PORT}`))


