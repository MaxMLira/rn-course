import {View, Text, StyleSheet, Alert, FlatList, useWindowDimensions} from 'react-native';
import Title from '../components/ui/Title';
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import {Ionicons} from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';
function generateRandomBetween(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess =  generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuest] = useState(initialGuess);
    const [guessRounds, setGuessRounds] =  useState([initialGuess]);
    const {width, height} = useWindowDimensions();
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);
    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    function nextGuessHandler(direction){
        if(direction === 'lower' && currentGuess < userNumber
         || direction === 'greater' && currentGuess > userNumber){
            Alert.alert(
                "Don't lie",
                "You know that is wrong...",
                [{text:'Sorry!', style:'cancel'}]
            );
            return;
        }
        if(direction === 'lower'){
            maxBoundary = currentGuess - 1;
            
        }else{
            minBoundary = currentGuess + 1;           
        }
        const newRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuest(newRndNum);
        setGuessRounds(prev => [ newRndNum, ...prev]);
    }
    const guessLenght = guessRounds.length;
    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}> Higher or lower? </InstructionText>
                <View style={styles.btnsContainer}>
                    <View style={styles.btnContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')} >
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.btnContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>

            </Card>


        </>
    );    
    if(width > 500){
        content = (
            <>
                 
              
                 <View style={styles.btnsContWide}>
                    <View style={styles.btnContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')} >
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.btnContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
             

                 </View>

            </>
        )
    }




    return(
        <View style={styles.screen}>            
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound} >{guessRound}</Text>)} */}
                <FlatList 
                     data={guessRounds} 
                     renderItem={ (itemData) => (  
                        <GuessLogItem roundNumber={guessLenght - itemData.index}
                                guess={itemData.item} 
                        />) } 
                     keyExtractor={(item) => item}
                /> 
            </View>
        </View>
    );
}


export default GameScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        marginTop:25,
        alignItems:'center'
    },
    instructionText:{
        marginBottom:12,
    },
    btnsContainer:{
        flexDirection: 'row',
        
    },
    btnContainer:{
        flex:1
    },
    btnsContWide:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContainer:{
        flex: 1,
        padding: 16,
    },


   
})