import React, { useState, useEffect, setState } from 'react';
import { Text, View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({navigation, route}) => {
    let [quote, setQuote] = useState([]);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    
    useEffect(() => {
        fetch("https://quotes.rest/qod?language=en", {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TheySaidSo-Api-Secret": "myworkoutapp",
        }})
        .then((response) => response.json())
        .then((json) => setQuote(json.contents.quotes))
        .catch((error) => {
            console.error(error);
        });
        
        getAsyncData();
        
    }, []);

    const getAsyncData = async() => {
        try {
            AsyncStorage.getItem('userFirstName', function(errs, result) {
                if (!errs) {
                  if (result !== null) {
                    console.log('userFirstName' + result); /* it works */
                  }
                }
              }).then((firstName) => setFirstName(firstName));
              AsyncStorage.getItem('userLastName', function(errs, result) {
                if (!errs) {
                  if (result !== null) {
                    console.log('userLastName' + result); /* it works */
                  }
                }
              }).then((lastName) => setLastName(lastName));
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <View style={styles.mainView}>
        <FlatList
            data={quote}
            keyExtractor={({ quote }) => quote}
            renderItem={({ item }) => (
                <View key={item.date}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.welcomeUser}>{firstName} {lastName}</Text>
                    <View style={styles.imageHolder}>
                        <ImageBackground style={styles.mainImage} source={{uri:item.background}}>
                        <Text key={item.date} style={styles.mainQuote}>{item.quote}</Text>
                        <Text key={item} style={styles.mainAuthor}>{item.author}</Text>
                        </ImageBackground>
                    </View>
                </View>
          )}
        />
        </View>
    )

}

export default Home;

const styles = StyleSheet.create({

    mainView: {
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#44564a',
        height: '100%',
    },

    welcomeText: {
        marginTop: 0,
        fontSize: 70,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center',
        width: '100%',
        color: '#e1c281',
        zIndex: 1,
    },

    welcomeUser: {
        marginTop: 0,
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center',
        width: '100%',
        color: '#e1c281',
        zIndex: 1,
    },

    imageHolder: {
        width: '100%',
        height: '100%',
    },

    mainImage: {
        marginTop: 30,
        width: '100%',
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    mainQuote: {
        marginTop: 0,
        fontSize: 30,
        fontFamily: 'Arial',
        textAlign: 'center',
        color: 'white',
    },
    mainAuthor: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        zIndex: 1,
    },
});