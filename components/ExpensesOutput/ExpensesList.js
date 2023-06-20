import { FlatList, Text, View } from "react-native";
import ExpensesItem from "./ExpensesItem";
function renderItem(itemData){

    return <ExpensesItem  {...itemData.item} />;
}
function ExpensesList({expenses}){
    
    return (       
        <FlatList  data={expenses} renderItem={renderItem} keyExtractor={(item)=> item.id}/>       
    )

}
export default ExpensesList;