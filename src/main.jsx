import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import App from './App';
import DragPreview from './components/common/dragPreview/dragPreview';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import Toast from './components/common/toast/toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
  <DragPreview />
    </Provider>
    <Toast />
  </BrowserRouter>
);
