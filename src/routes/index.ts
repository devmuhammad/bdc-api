import * as userRouter from './userRoute'        //import routes
import * as authRouter from'./authRoute'
import * as saleRouter from'./saleRoute'
import * as currencyRouter from'./currencyRoute'
import * as purchaseRouter from'./purchaseRoute'
import * as biddingRouter from'./biddingRoute'
import * as xchangeRouter from'./xchangeRoute'



export const routers = {
  user: userRouter,
  auth: authRouter,
  sale: saleRouter,
  currency: currencyRouter,
  purchase: purchaseRouter,
  bidding: biddingRouter,
  rate: xchangeRouter
};


