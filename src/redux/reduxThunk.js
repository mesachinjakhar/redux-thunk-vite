import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create store with thunk middleware
const store = createStore(reducer, applyMiddleware(thunk));

// Action Creators
const fetchStart = () => ({ type: "FETCH_START" });
const fetchSuccess = (data) => ({ type: "FETCH_SUCCESS", payload: data });
const fetchError = (error) => ({ type: "FETCH_ERROR", payload: error });

// Thunk Action Creator
const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchStart()); // Start loading
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch(fetchSuccess(data)); // Success
    } catch (error) {
      dispatch(fetchError(error.message)); // Error
    }
  };
};

store.subscribe(() => console.log("State:", store.getState()));

// Dispatch async action
store.dispatch(fetchData());
