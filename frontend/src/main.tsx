import ReactDOM from 'react-dom/client';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptor } from './axiosApi';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants/constants';
import './index.css';

addInterceptor(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
);
