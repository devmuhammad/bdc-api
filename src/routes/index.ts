import * as userRouter from './userRoute'        //import routes
import * as authRouter from'./authRoute'
import * as saleRouter from'./saleRoute'
import * as currencyRouter from'./currencyRoute'
import * as purchaseRouter from'./purchaseRoute'



export const routers = {
  user: userRouter,
  auth: authRouter,
  sale: saleRouter,
  currency: currencyRouter,
  purchase: purchaseRouter
};


