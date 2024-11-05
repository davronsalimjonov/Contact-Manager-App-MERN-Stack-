import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer } from "./auth/auth.slice";

const authPersistConfig = {
  key: "auth",
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
})

export default rootReducer