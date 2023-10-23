import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

interface RootState {
  counter: number;
}

const initialState: RootState = {
  counter: 0,
};

enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

interface IncrementAction {
  type: ActionType.INCREMENT;
}

interface DecrementAction {
  type: ActionType.DECREMENT;
}

type Action = IncrementAction | DecrementAction;

function reducer(state = initialState, action: Action): RootState {
  switch (action.type) {
    case ActionType.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case ActionType.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {
  const [inputValue, setInputValue] = useState('');
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleIncrementClick() {
    dispatch({ type: ActionType.INCREMENT });
  }

  function handleDecrementClick() {
    dispatch({ type: ActionType.DECREMENT });
  }

  return (
    <div>
      <h1>My Counter App</h1>
      <p>Current Count: {counter}</p>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleIncrementClick}>Increment</button>
        <button onClick={handleDecrementClick}>Decrement</button>
      </div>
    </div>
  );
}

function MyApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default MyApp;
