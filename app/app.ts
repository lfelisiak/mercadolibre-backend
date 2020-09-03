import express, { IRoute, Router,Response,Request } from 'express';
import bodyParser from 'body-parser';

class App {

  public app: express.Application;
  public port: number;
 
  constructor(routes:Array<Router>, port:number) {
    this.app = express();
    this.port = port;
    
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }
 
  private initializeRoutes(routes:Array<any>) {
    routes.forEach(route => {
      (this.app as any)[route.method](route.prefix+route.route,(req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next);
          if (result instanceof Promise) {
              result.then( (result) => {
                console.log(result);
                if(result !== null && result !== undefined )
                   return res.json(result) 
                else 
                  return undefined;
              }) 
              .catch(err=> console.log(err));
          } else if (result !== null && result !== undefined) {
              return res.send(result);
          }
      });
    });
    
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

}
 
export default App;