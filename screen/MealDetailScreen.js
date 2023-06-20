import { Text, Image,StyleSheet, View, ScrollView, Button } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import List from "../components/MealDetail/List";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
// import {FavoritesContext} from '../store/context/favorites-context'; now i will use the redux :) 
import { addFavorite, removeFavorite } from "../store/redux/favorite";
function MealDetailScreen({route, navigation}){
    // const favoriteContex = useContext(FavoritesContext);
    const favoriteMealsIds = useSelector((state)=> state.favoriteMeals.ids);
    const dispatch = useDispatch();
    const id = route.params.mealId;
    const meal = MEALS.find((meal) => {
        return meal.id===id;
    });

    const mealsIsFavorite = favoriteMealsIds.includes(id);

    function changeFavorite(){
        console.log("meal ", mealsIsFavorite);
        if(mealsIsFavorite){
            //favoriteContex.removeFavorite(id);
           dispatch(removeFavorite({ id:id }));
        }else{
            //favoriteContex.addFavorite(id);
            dispatch(addFavorite({ id:id }));
        }
   
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => {
                return <IconButton onPress={changeFavorite} icon={mealsIsFavorite ? 'star': 'star-outline'} color='white'/>
            }
        })
    },[navigation, changeFavorite]);

    return( 
        <ScrollView style={styles.root}>
                <Image style={styles.image} source={{uri:meal.imageUrl}} />
                <Text style={styles.title}>{meal.title}</Text>
                <MealDetails 
                            textStyle={{color:'white'}}
                            duration={meal.duration} 
                            complexity={meal.complexity} 
                            affordability={meal.affordability}   
                />
                <View style={styles.listOutContainer}>
                    <View style={styles.listContainer}>
                        <SubTitle>Ingredients</SubTitle> 
                        <List data={meal.ingredients} />
                        <SubTitle>Steps</SubTitle>
                        <List data={meal.steps} />                   
                    </View>
                </View>
            </ScrollView>
    )
};

export default MealDetailScreen;

const styles =  StyleSheet.create({
    root:{
        marginBottom: 24,
    },
    image:{
        width: '100%',
        height: 350
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        margin: 8,
        textAlign:'center',
        color:'white'
    },
   listContainer:{
    width: '80%'
   },
   listOutContainer:{
    alignItems: 'center'
   }
});