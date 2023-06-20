
import {FavoritesContext} from '../store/context/favorites-context';
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
function FavoriteScreen(){
    //const favoriteContex = useContext(FavoritesContext);
    const favoriteMealsIds = useSelector((state)=> state.favoriteMeals.ids);
    
    const favoriteMeals = MEALS.filter((meal) => {
        return favoriteMealsIds.includes(meal.id);
    });
    if(favoriteMeals.length === 0  ){
       return <View style={styles.container}>  
            <Text style={styles.text}>You have no favorite meals yet.</Text>
        </View>
    }
    return <MealsList items={favoriteMeals}/>
}
export default FavoriteScreen;
const styles =  StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
});