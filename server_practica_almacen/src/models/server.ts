import express, {Application, Request, Response} from 'express';
import routesProducts from '../routes/products'
import db from '../db/connection';
import cors from 'cors';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Aplicacion corriendo en el puerto${this.port}`)
        })
    }

    routes(){
        this.app.get('/', (req: Request, res: Response)=>{
            res.json({
                msg: 'Api working'
            })
        })
        this.app.use('/api/products', routesProducts)
    }

    midlewares(){
        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch(error){
            console.log(error);
            console.log('Error al conectar la base de datos');
        }
        
    }
}

export default Server;