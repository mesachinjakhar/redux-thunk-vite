import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/redux";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>Increment + </button>
      <button onClick={handleDecrement}>Decrement -</button>
    </div>
  );
};

export default Counter;
