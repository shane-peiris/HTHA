//Package Imports
import http from "http";
import https from "https";

//Module Imports
import app from "./app.js";
import isEmpty from "./utils/isEmpty.js"

//Use system configuration for server port
const PORT = process.env.SERVER_PORT;

//Check if server port is empty
if (isEmpty(PORT)) {
    console.log("Please configure your server port");
}
else {
    //Use system configuration for environment configuration or default to "DEV"
    const ENV = process.env.ENV || 'DEV';

    //Start initializing the server based on environment configuration
    let server = "";

    if (ENV == 'DEV') {

        //Initialze server with http
        server = http.createServer(app)

    } else {

        //Check if SSL Key and Cert paths are available
        if (isEmpty(process.env.SSL_KEY) || isEmpty(process.env.SSL_CERT)) {
            console.log("Please configure your SSL Key and Cert");
        }
        else {
            //Initialze server with https using SSL Key and Cert
            server = https.createServer({
                key: fs.readFileSync(process.env.SSL_KEY),
                cert: fs.readFileSync(process.env.SSL_CERT)
            }, app);
        }
    }

    //Check if server is defined
    if (!isEmpty(server)) {
        //If server is defined start the server at the given port
        server.listen(PORT, () => {
            console.log(ENV + ' Server running at PORT - ' + PORT);
        });
    }
}

