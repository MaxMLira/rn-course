import {  Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from '@react-navigation/native';

function ExpensesItem({id, amount, date, description}){
    const navigation = useNavigation();
    function pressHandler(){
        navigation.navigate('ManageExpenses',{
            expenseId: id,
        });
    }
    return (       
        <Pressable onPress={pressHandler}  
                style={({pressed}) =>  pressed && styles.pressed }
        >
            <View style={styles.item}>
                <View>
                    <Text style={[styles.textBase, styles.desc]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )

}
export default ExpensesItem;
const styles = StyleSheet.create({
    item:{
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 5,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius:4,
        shadowOffset: {width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase:{
        color:GlobalStyles.colors.primary50,
    },
    desc:{
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount:{color: GlobalStyles.colors.primary500, fontWeight: 'bold'},
    pressed:{
        opacity:0.75
    }
});