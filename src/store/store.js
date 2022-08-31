import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import mediaReducer from './media/mediaReducer';

// composeWithDevTools - devTools for Redux in Chrome
const store = createStore(mediaReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
