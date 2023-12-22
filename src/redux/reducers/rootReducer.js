// ** Redux Imports
import { combineReducers } from "redux"
import tour from "../../scenes/manageTour/store/reducer"
// ** Reducers Imports
import authReducer from "./auth"
const rootReducer = combineReducers({
    authReducer,
    tour
})

export default rootReducer
