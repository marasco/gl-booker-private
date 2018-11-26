import ReactDOM from 'react-dom';
import { makeMainRoutes } from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();