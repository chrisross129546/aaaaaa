import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';
export const app: Express = express();
import cors from 'cors';
import { Database } from './src/models/services/Database/manager';
import proxy from 'express-http-proxy';
import { defaultRouter } from './src/routers/Default';

Database.Connect();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

defaultRouter(app);

app.use(
	'/',
	proxy(process.env.SERVER_1 || '', {
		proxyReqPathResolver: function (req) {
			let path = req.url;
			path = path.replace('/croute', '');
			path !== 'ping' && console.log('Post', path);
			return path;
		},
	})
);

app.use((err: any, req: any, res: any, next: any) => {
	console.error(err);
	res.status(500).json({ type: 'error', message: err.message });
});

app.listen(80, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT || 80}`);
});
