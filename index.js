const app             = require('express')()
      ,config         = require('./config')
      ,dbConfig       = require('./config/database.config')
      ,bodyParser     = require('body-parser')
      ,typeorm        = require("typeorm")
      ,Routes         = require('./api/routes')
      ,middleware     = require('./api/middleware/verifyToken')
      ,morgan         = require('morgan')
      ,fs             = require('fs')
      ,path           = require('path');

      import {createConnection} from "typeorm";

// parse request to JSOn
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  

// Webserver
const server = require('http').Server(app);
server.listen(config.app.port, () => console.log(`App running on port ${config.app.port}`) );



// Mysql Connection
createConnection({
    type: "mysql",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [
        require("./entity/PostSchema"),
        require("./entity/CategorySchema")
    ]
}).then(connection => {
    console.log("DB connection succesfull.");
}).catch(error => { console.log(error)
    process.exit();
}
);


//monitor DB connection    
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => { console.log(`Connected to db at ${dbConfig.url}`); }); 
 

// log http request
let httpLogStream = fs.createWriteStream(path.join(__dirname, 'httplogs.log'), {flags: 'a'})    
app.use(morgan('combined', {stream: httpLogStream}));


//Apply middleware
app.use(['/user', '/medicalinfo'], middleware)
// Routes

app.use("/user", Routes.user);




