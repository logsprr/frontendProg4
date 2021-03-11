import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { store };