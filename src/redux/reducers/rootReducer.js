// ** Redux Imports
import { combineReducers } from "redux"
// ** Reducers Imports
import authReducer from "./auth"
const rootReducer = combineReducers({
    authReducer
})

export default rootReducer
