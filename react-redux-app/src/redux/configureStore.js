import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

// Configure centralised store which will be called at app's entry point
export default function configureStore(
  // pass an initial state to initialise the store with some initial data when the app starts
  initialState
) {
  const composeEnhancers =
    // checks whether Redux dev tools are available, else compose
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    // 1st Arg: creat store with all reducers combined in rootReducer
    rootReducer,
    // 2nd Arg: and the initial data passed in at configuration
    initialState,
    // 3rd Arg: compose dev tools to apply middleware to warn against directly changing store data
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}

// Apply redux middleware to enable dev tools in the browser to interact with the store
/**
 *  ?! Redux middle is a way to enhance Redux's behaviour with extra functionality.
 *
 *  Apply middleware prevents us from mutating state
 *  1. Add support for Redux dev tools by importing "compose" function from "redux"
 *  2. Import "applyMiddleware" function from "redux" to work with middleware
 *  3. Import "reduxImmutableInvariant" middleware function that we would like to apply
 *     (reduxImmutableInvariant wil warn us if we accidentally mutate Redux state.)
 *  4. Pass the middleware to applyMiddleware() which is passed to composeEnhancers()
 *     that enables Redux dev tools.
 */
