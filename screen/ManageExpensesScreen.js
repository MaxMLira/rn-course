import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense,deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function ManageExpensesScreen({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const ctx = useContext(ExpensesContext);
    const id = route.params?.expenseId;
    const isEditing = !!id;

    const selectedExepense= ctx.expenses.find(expense => expense.id === id);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense': 'Add Expense'
        });
    }, [navigation, isEditing]);
    

    async function deleteExpenses(){
        setIsSubmitting(true);
        try { 
            await deleteExpense(id);
            ctx.deleteExpense(id);        
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later');
        }
        setIsSubmitting(false);
     
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        try {
            if(isEditing){            
                ctx.updateExpense(id, expenseData);
                await updateExpense(id, expenseData);
            }else{
                const id = await storeExpense(expenseData);
                const text = {...expenseData, id };           
                ctx.addExpense(text);
            }            
            navigation.goBack();
         } catch (error) {
            setError('Could not save data - please try later!');
            setIsSubmitting(false);
        }
        
    }


    if(error && !isSubmitting){
        return <ErrorOverlay message={error} />;
    }

    if(isSubmitting){
        return <LoadingOverlay />;
    }

    return <View style={styles.container}>
             <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler}
              submitLabel={isEditing ? 'Update': 'Add'} defaultValues={selectedExepense}  /> 
           
            {isEditing && (
                <View style={styles.deleteContainer}> 
                    <IconButton
                                    icon='trash'
                                    color={GlobalStyles.colors.error500}
                                    size={36}
                                    onPress={deleteExpenses} 
                            />
                </View>
            )}
        </View>

}
export default ManageExpensesScreen;
const styles =  StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,

    },  
    
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',

    }
})