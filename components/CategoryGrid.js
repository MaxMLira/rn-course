import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native";

function CategoryGrid({ title, color, onPress}){
    return (
        <View style={[styles.gridItem, {backgroundColor: color}]}>
            <Pressable style={styles.btn} android_ripple={{color: '#ddd'}} onPress={onPress}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>                
            </Pressable>
        </View>
    )



}
export default  CategoryGrid; 
const styles = StyleSheet.create({
 gridItem:{
    flex:1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    overflow: 'hidden'
 },
 btn:{
    flex: 1,
 },
 innerContainer:{
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
 },
 title:{
    fontWeight: 'bold',
    fontSize: 18
 }
});