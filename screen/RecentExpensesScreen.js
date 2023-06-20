
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpensesScreen(){
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
       async function getExpenses(){
            setIsFetching(true);
            try {
                const expenses =  await fetchExpenses();
                expensesCtx.setExpenses(expenses);

            } catch (error) {
                setError('Could not fetch expenses!');
            }            
            setIsFetching(false);
        }

        getExpenses();
    }, []);

  

    if(error && !isFetching){
        return <ErrorOverlay message={error} />;
    }

    if(isFetching){
        return <LoadingOverlay />;
    }

    const expenses = expensesCtx.expenses;

    const recentExpenses = expenses.filter((expense)=> {  
        const today = new Date();
        const dateOneYearAgo =  getDateMinusDays(today, 365);
        return expense.date > dateOneYearAgo;
     });


    return <ExpensesOutput periodName={'Last one year'} fallbackText='No expenses register for the last year'  expenses={recentExpenses} />

}
export default RecentExpensesScreen;