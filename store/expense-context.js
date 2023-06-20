import { createContext, useReducer } from "react";



export const ExpensesContext = createContext({
    expenses:[],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description,amount, date}) => {},
});
function expenseReducer(state, action) {
    switch(action.type){
        case 'ADD':            
            return [action.payload, ...state ];
        case 'SET':
            const inverted =  action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updateExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id);
            const updatableExpense = state[updateExpenseIndex];
            const updateItem = {...updatableExpense, ...action.payload.data };
            const updatedExepenses = [...state];
            updatedExepenses[updateExpenseIndex] = updateItem;
            return updatedExepenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id);
        default:
            return state;    
    }
}
function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expenseReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }
    function setExpenses(expenses){
        dispatch({ type: 'SET', payload: expenses });
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: {id:id} });
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id:id, data: expenseData } });
    }
    
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider;