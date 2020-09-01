import {createStore,compose} from 'redux';
import rootReducer from './Reducers';
import thunk from "redux-thunk";
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    rootReducer,
     );
   
export default store;






