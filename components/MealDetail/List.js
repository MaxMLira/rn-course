import {View, StyleSheet, Text} from 'react-native';
function List({data}){

   return data.map((dataPointer) => (
            <View key={dataPointer} style={styles.item}>
                <Text style={styles.text}>{dataPointer}</Text>
            </View>
        ))
    
}

export default List;
const styles =  StyleSheet.create({
    item:{
        borderRadius:6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#e2b497'
    },
    text:{
        color:'#351401',
        textAlign: 'center',
    }
})