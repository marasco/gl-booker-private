import React from 'react'
import ReactDOM from 'react-dom';
import { makeMainRoutes } from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { initialState, reducers } from './store/reducers'

const store = createStore(reducers, initialState, applyMiddleware(thunk))
const routes = makeMainRoutes();
ReactDOM.render((<Provider store={store}>{ routes }</Provider>), document.getElementById('root'));
registerServiceWorker();