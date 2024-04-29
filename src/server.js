import e from 'express';
import { usersRoute } from './routes/userRoute.js';
import bodyParser from 'body-parser';

export class Server {
    constructor(port) {
        this.app = e();

        this.setMiddlewares()

        this.setRoutes();

        this.listen(port);
    }

    setMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    setRoutes() {
        this.app.use(e.static('public'));
        this.app.use('/api/users', usersRoute);
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`ouvindo na porta ${port}`);
        });
    }
}