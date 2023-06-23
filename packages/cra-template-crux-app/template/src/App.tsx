import React from 'react';
import logo from './logo.svg';
import { AppContext } from './store';
import Crux, {LoggingMiddleware} from './Crux';
import './App.css';

function App() {
  const {state, dispatch} = React.useContext(AppContext)

  React.useEffect(() => {
    Crux.middlewares = [
      new LoggingMiddleware()
    ]

    Crux.scriptAdapter = {
        dispatchToScript: (name: string, payload: any) => {
            console.log("dispatchToScript", name, payload)

            // Forward the event to the context.
            dispatch({ type: name, data: payload });
        }
    }

    // Cleanup.
    return () => {
      Crux.scriptAdapter = undefined
    };
  }, []);

  const incrementValueA = () => {
    Crux.dispatchToScript("INCREMENT_VALUE_A");
  }

  const resetValueA = () => {
    Crux.dispatchToScript("SET_VALUE_A", { value: 0 })
  }

  const sayHello = () => {
    Crux.dispatchToNative("navigate", { destination: "test" })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button id="incrementValueA" onClick={incrementValueA}>
          Value A + 1
        </button>
        <button id="reset-value" onClick={resetValueA}>
          Reset Value A
        </button>
        <button id="sayHello" onClick={sayHello}>
          Say Hello
        </button>
        <div>
          <p>Value A: {state.valueA || 0}</p>
          <p>Value B: {state.valueB || 0}</p>
        </div>
      </header>

    </div>
  );
}

export default App;
