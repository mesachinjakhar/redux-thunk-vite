import { applyMiddleware, createStore } from "redux";

// custom logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Before Action: ", store.getState().count);
  console.log("Dispatching Action: ", action);
  const result = next(action);
  console.log("After Action: ", store.getState().count);
  return result;
};

// initial State
const initialState = {
  count: 0,
};

// Creating Reducer
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return { ...state, count: state.count + 1 };
  }
  if (action.type === "decrement") {
    return { ...state, count: state.count - 1 };
  }

  return state;
};

// Action
export function increment() {
  return { type: "increment" };
}
// Action
export function decrement() {
  return { type: "decrement" };
}

// Create Store and pass Reducer and Middleware(optional)
export const store = createStore(
  counterReducer,
  applyMiddleware(loggerMiddleware)
);

// Subscribing to store to fetch the latest updated value of count.
// store.subscribe(() => console.log(store.getState().count));

// Finally Calling the store with actions using dispatch fn
// store.dispatch(increment());
