import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-context";

function AllExpensesScreen(){
    const expensesCtx = useContext(ExpensesContext);
    const expenses = expensesCtx.expenses;

    return <ExpensesOutput fallbackText='No registered expenses found!' periodName={'Total'} expenses={expenses} />
}
export default AllExpensesScreen;