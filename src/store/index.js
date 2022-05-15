import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

// composeWithDevTools - devTools for Redux in Chrome
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
