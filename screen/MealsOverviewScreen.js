import {  useLayoutEffect } from "react";
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";
function MealsOverviewScreen({ route, navigation }){
    const ctId = route.params.categoryId;
    const displayedMeals = MEALS.filter((meal) => {
        return meal.categoryIds.indexOf(ctId) >= 0;
    });

    useLayoutEffect(()=> {
        const categoryTitle = CATEGORIES.find(
            (category) => category.id === ctId
        ).title;
        navigation.setOptions({
            title: categoryTitle
        });
    },[ctId, navigation]);
    
    return <MealsList items={displayedMeals} />

 
};
export default MealsOverviewScreen;

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
    }
});