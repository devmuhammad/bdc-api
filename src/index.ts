import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swaggerUi from 'swagger-ui-express'
import { port } from '../config'
import { routers as routes } from './routes/index'
import * as swaggerDocument from './swagger.json';
import {verifyToken as middleware} from './middleware/verifyToken'
import * as cors from 'cors'

const baseUrl = "cabsolbdc/api/v1"

// create connection with database
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async () => {

  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Enable Cors
  app.use(cors({credentials: true, origin: true}));

  // run app

  app.listen(port, () => console.log(`App is up and running on port ${port}`));

  app.get('/', (req, res) => res.send('Hello Cabsol BDC!'))
  // create swagger documentation , swaggerUi.setup(swaggerDocument)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Apply Middleware
  // app.use(['/cabsolbdc/api/v1/user','/sale','/currency','/purchase','/bidpurchase','/xchangerate'], middleware)

  // Register routes
  app.use("/cabsolbdc/api/v1/user/",middleware, routes.user);
  app.use("/cabsolbdc/api/v1/auth/", routes.auth);
  app.use("/cabsolbdc/api/v1/sale/",middleware, routes.sale);
  app.use("/cabsolbdc/api/v1/currency/",middleware, routes.currency);
  app.use("/cabsolbdc/api/v1/purchase/",middleware, routes.purchase);
  app.use("/cabsolbdc/api/v1/bidpurchase/",middleware, routes.bidding);
  app.use("/cabsolbdc/api/v1/xchangerate/",middleware, routes.rate);


}).catch(error => console.log("TypeORM connection error: ", error));