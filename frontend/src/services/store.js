import { composeWithDevTools } from "@redux-devtools/extension"
import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import { thunk } from "redux-thunk"
import { UserLoginReducer } from "./reducers/auth.reducer"
import { ModalReducer } from "./reducers/modal.reducer"
import { BlogDetailsReducer, BlogListReducer } from "./reducers/blog.reducer"

// Define your middleware here and pass them to the createStore function.
const middleware = [thunk]

// Define your reducers here.
const appReducer = combineReducers({
    authorization: UserLoginReducer,
    blogs: BlogListReducer,
    blogDetails: BlogDetailsReducer,
    modal: ModalReducer
})

// Define your root reducer here. This is where you combine all your reducers.
const rootReducer = (state, action) => {
    return appReducer(state, action)
}


// Define your store here. This is where you combine your reducers and apply your middleware.
let composeEnhancers = compose

// Enable Redux DevTools if available.
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV != 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools
}

// Create your Redux store here. This is where you apply your middleware and compose your reducers.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export default store