import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { store } from './store';
import App from './App';

const config = {
  apiKey: 'AIzaSyBlOp6dScVw84Dj1Znf8CqsjQd11CuGB_4',
  authDomain: 'cloudfunctions-ba4c2.firebaseapp.com',
  databaseURL: 'https://cloudfunctions-ba4c2.firebaseio.com',
  projectId: 'cloudfunctions-ba4c2',
  storageBucket: 'prog-iv',
  messagingSenderId: '56205221418',
  appId: '1:56205221418:web:d98e796f657f0495',

};

firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
