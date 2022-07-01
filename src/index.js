import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import UserContext from './contexts/index';

const UserProvider = ({ children }) => {
  const [chosenUserId, setChosenUserId] = useState(null);
  return (
    <UserContext.Provider value={{ chosenUserId, setChosenUserId }}>
      {children}
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
);

