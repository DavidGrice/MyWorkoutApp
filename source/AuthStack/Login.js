import React, {setState, useEffect, useState, useContext} from 'react';
import { Text, Button, View, SafeAreaView, StyleSheet, Image,
         TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../Assets/Images/Splash_image.png';

import { AuthContext } from '../context';

var db = openDatabase({ name: 'Users.db'});

const Login = ({ navigation }) => {
    let [inputUserName, setInputUserName] = useState('');
    let [inputPassword, setInputPassword] = useState('');
    let { signIn } = useContext(AuthContext);


    useEffect(() => {

        db.transaction(function (transaxion) {
            transaxion.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='users_table'",
                [],
                function(transacion, results) {
                    console.log('item:', results.rows.length);
                    if (results.rows.length == 0) {
                        transaxion.executeSql('DROP TABLE IF EXISTS users_table', []);
                        transaxion.executeSql(
                            `CREATE TABLE IF NOT EXISTS users_table (
                                user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                user_name VARCHAR(20) NOT NULL, 
                                user_password VARCHAR(20) NOT NULL, 
                                first_name VARCHAR(20) NOT NULL, 
                                last_name VARCHAR(20) NOT NULL, 
                                user_token VARCHAR(64) NOT NULL)`,
                            []
                        );
                    }
                }
            );
        });
    }, []);

    let userSearch = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * from users_table where user_name = ? AND user_password = ?',
                [inputUserName, inputPassword],
                (txn,results) => {
                    var leng = results.rows.length;
                    if (leng > 0){
                        let result = results.rows.item(0);
                        signIn(result.user_name, result.first_name, result.last_name, result.user_token)
                    } else {
                        alert('Failed to login')
                    }
                }
            )
        })
    }

    return (
        <SafeAreaView style={styles.mainBody}>
            
            <LinearGradient 
            colors={['purple', 'darkblue']}
            style={styles.mainContainer}
            >

            <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle}>
                <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.keyboardStyle}
                        >
                    <View style={styles.subContainer}>

                            <Image 
                            source={Logo}
                            style={styles.logo}
                            />
                        

                        <View style={styles.sectionsStyling}>
                            <TextInput 
                                style={styles.inputTextStyle}
                                onChangeText={(inputUserName) => setInputUserName(inputUserName)}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Enter Username"
                                placeholderTextColor="white"
                                onSubmitEditing={Keyboard.dismiss}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.sectionsStyling}>
                            <TextInput 
                                style={styles.inputTextStyle}
                                onChangeText={(inputPassword) => setInputPassword(inputPassword)}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Enter Password"
                                placeholderTextColor="white"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                            />
                        </View>
                            <View style={styles.loginButton}>
                                <Button 
                                    title={"Login"}
                                    color='#4A4DE7'
                                    onPress={userSearch}>
                                </Button>
                            </View>
                            <View style={styles.signupView}>
                                <TouchableOpacity>
                                    <Text 
                                    style={styles.signupText} 
                                    onPress={() => {navigation.navigate('Signup')}}>Don't have an account? Tap here!</Text>
                                </TouchableOpacity>
                            </View>
                        
                        
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
        </LinearGradient>

        </SafeAreaView>
    )

}

export default Login;

const styles = StyleSheet.create({

    mainBody: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
    },

    mainContainer: {
        alignSelf: "center",
        borderRadius: 5,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        height: '100%',
        width: '100%',
    },

    subContainer: {
        marginTop: 70,
        alignSelf: "center",
        height: 500,
        width: 350,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: 20,
    },

    logo: {
        width: '100%',
        height: '40%',
        resizeMode: "stretch",
        
    },

    sectionsStyling: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },

    inputTextStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'gold',
    },

    loginButton: {
        marginTop: '7%',
        alignSelf: 'center',
        width: '40%',
        borderRadius: 20,
    },

    signupView: {
        marginTop: '10%',
        width: '65%',
        height: '5%',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
    },

    signupText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },


});