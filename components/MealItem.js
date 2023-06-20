import { useNavigation } from "@react-navigation/native";
import {  StyleSheet, View,Text, Pressable, Image } from "react-native";
import MealDetails from "./MealDetails";
function MealItem({id, title, imgUrl, duration, affordability, complexity}){
    const navigation = useNavigation();
    function pressHandler(){
        navigation.navigate('MealDetail',{
            mealId: id
        });
    }
    const mealItemProps= {
        duration: duration,
        affordability: affordability,
        complexity: complexity,
    }
    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{color:'#ccc'}} onPress={pressHandler}>
                <View>
                    <Image source={{uri: imgUrl }} style={styles.image} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MealDetails {...mealItemProps}/>
            </Pressable>
            
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem:{
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 10,
    },
    image:{
        width:'100%',
        height: 200,
    },
    title:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin:8
    },
   
});