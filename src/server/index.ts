import express, { Request, Response, NextFunction} from 'express';
const path = require('path');
var cors = require('cors');
import routes from './routes/routes.js';
import { json } from 'body-parser';

const app = express();
const port = 4000;

app.use(cors());
app.use(json());
app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(501).json({ message: err.message });
})

app.listen( port, () => {
    console.log(`server started at http://localhost:${port}`);
});