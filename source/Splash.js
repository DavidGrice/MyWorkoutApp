import React from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import SplashImage from './Assets/Images/Splash_image.png';
import LinearGradient from 'react-native-linear-gradient';

const Splash = () => {

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
            <LinearGradient
                    colors={['purple', 'darkblue']}
                    style={styles.linearGradient}>

                    <Image 
                        style={styles.splashLogo}
                        source={SplashImage}
                    /> 

                    <Text style={styles.title}> MyWorkoutApp </Text>
                    <ActivityIndicator size="large" color="white" style={styles.loader} />
                </LinearGradient>
            </View>
        </SafeAreaView>
    )

}

export default Splash;

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },

    container: {
        flex: 1,
        marginLeft: 0,
        marginTop: 0,
        flexDirection: 'column',
        backgroundColor: '#4c669f'
    },

    linearGradient: {
        alignContent: "center",
        borderRadius: 5,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        height: '100%',
        width: '100%',
      },

    splashLogo: {
        marginTop: 125,
        width: 400,
        height: 250,
        resizeMode: "stretch",
        backgroundColor: 'transparent',
    },

    title: {
        fontSize: 50,
        fontFamily: 'Arial',
        fontWeight: "bold",
        borderColor: 'gold',
        borderRadius: 5,
        borderWidth: 5,
        marginLeft: 5,
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: 'white',
        width: 400,
    },

    loader: {
        marginTop: 40,
    },

});