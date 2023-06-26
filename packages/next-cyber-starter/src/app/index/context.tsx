import React, {createContext, useReducer} from 'react';

type Action = {
    type: string,
    data: { [key: string] : any }
}

type InitialStateType = {
    valueA: number,
    valueB: number
}

const initialState = {
    valueA: 0,
    valueB: 0
};

const PageContext = createContext<{
    state: InitialStateType,
    dispatch: React.Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null
});

// Combine multiple reducers, allowing state to be sliced.
const mainReducer = (
    { valueA, valueB }: { valueA: number, valueB: number},
    action: any
) => ({
    valueA: valueAReducer(valueA, action),
    valueB: valueBReducer(valueB, action),
});

export const valueAReducer = (state: number, action: Action) => {
    switch (action.type) {
    case 'INCREMENT_VALUE_A':
        return (state || 0) + 1;
    case 'DECREMENT_VALUE_A': 
        return (state || 0) - 1;
    case 'SET_VALUE_A':
        return state = action.data.value;
    default:
        return state;
    }
}

export const valueBReducer = (state: number, action: Action) => {
    switch (action.type) {
    case 'INCREMENT_VALUE_B': 
        return (state || 0) + 1;
    case 'DECREMENT_VALUE_B': 
        return (state || 0) - 1;
    case 'SET_VALUE_B':
        return state = action.data.value;
    default:
        return state;
    }
}

const PageProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState)
  
    return (
      <PageContext.Provider value={{state, dispatch}}>
        {children}
      </PageContext.Provider>
    )
}

export { PageContext, PageProvider }