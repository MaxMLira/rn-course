import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGrid from "../components/CategoryGrid";

function CategoryScreen({navigation}){
    function renderItem(itemData){
        function pressHandler(){
            navigation.navigate('MealsOverview',{
                categoryId: itemData.item.id,
            });
        }
        return (
           <CategoryGrid onPress={pressHandler} color={itemData.item.color} title={itemData.item.title} />
        )
    }
    return (
        <FlatList 
            data={CATEGORIES} 
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={ (c) => c.id}  
                
        />
    )



}
export default  CategoryScreen; 