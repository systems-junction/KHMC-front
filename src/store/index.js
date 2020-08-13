import { applyMiddleware, compose, createStore } from 'redux';
import rootReducers from '../reducers/index';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
// import rootReducers from 'app/reducers'; 

const config = {
  key: 'root',
  storage,
  whitelist: ['auth']
  // debug: true //to get useful logging
}
// -----------------------FROM PREVIOUS-------------------------------//
const history = createBrowserHistory();



// -----------------------FROM PREVIOUS-------------------------------//
const middleware = [];
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
middleware.push(sagaMiddleware);
middleware.push(routeMiddleware)

const reducers = persistCombineReducers(config, rootReducers(history));
const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = { enhancers };
//export default function configureStore(initialState) {
const configureStore = () => {
  const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middleware)))


  const persistor = persistStore(store, persistConfig, () => {
      // console.log('Test', store.getState());
  });

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return { persistor, store };
};


export default configureStore;

export { history };




