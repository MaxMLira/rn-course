
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../MealItem";
function MealsList({items}) {
    function renderItem(itemData){
        const item = itemData.item;
        const mealItemProps = {
            id: item.id,
            title:item.title, 
            imgUrl:item.imageUrl,
            duration:item.duration,
            affordability:item.affordability,
            complexity:item.complexity
        }
        
        return <MealItem  {...mealItemProps} />
    }
    return(
        <View style={styles.container}>
            <FlatList data={items} keyExtractor={(item)=> item.id} renderItem={renderItem} />
            
        </View>
    )

}
export default MealsList;
const styles =  StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
    }
});