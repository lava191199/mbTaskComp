import { combineReducers } from "redux";
import taskReducer from "./mbTask/reducer";

const rootReducer = combineReducers({
    taskReducer,
})

export default rootReducer;