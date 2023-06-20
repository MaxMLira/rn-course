import {Text, StyleSheet, Dimensions} from 'react-native';

function Title({children}){
    //Opponent's Guess
    return  <Text style={styles.ttile}>{children}</Text>
            
}

export default Title;
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    ttile:{
        fontFamily:'open-sans-bold',
        fontSize: deviceWidth < 350? 12 : 24,
        //fontWeight: 'bold',
        color: 'white',
        textAlign:'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        
    }
});