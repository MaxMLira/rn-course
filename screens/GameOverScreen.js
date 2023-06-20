import {  View, Image, StyleSheet, Text, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
function GameOverScreen({rounds, userNumber, onStartNewGame}){
    const {width, height} = useWindowDimensions();
    let imgSize = width < 380 ? 150 : 200;
    imgSize = height < 400 ? 80 : 200;
    const imgStyle = {
        width: imgSize,
        height: imgSize,
        borderRadius: 150
    };


    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imgStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.jpg')}/>
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds 
                    to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
                </Text>

                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>

            </View>
        </ScrollView>
    );
};
export default GameOverScreen;
const deviceWidth = Dimensions.get('window').width;

const styles =  StyleSheet.create({
    screen:{
        flex: 1
    },
    rootContainer:{
        flex:1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer:{
  //      width: deviceWidth < 380 ? 150 : 300,
  //      height: deviceWidth < 380 ? 150 :300,
    //    borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow:'hidden',
        margin: 36
    },
    image:{
        width: '100%',
        height: '100%',        
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: deviceWidth < 380 ? 12 :24,
        textAlign: 'center',
        marginBottom: deviceWidth < 380 ? 12 : 24
    },
    highlight:{
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});