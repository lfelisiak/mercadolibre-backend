import App from './app/app';
import {Routes} from './app/routes';
import { Port } from './app/config/config';

const app = new App(
  Routes,
  Port,
);

app.listen();