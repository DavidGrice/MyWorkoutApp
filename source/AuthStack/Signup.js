import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, 
    TextInput, Keyboard, SafeAreaView, Alert, StyleSheet,
    TouchableOpacity, Button} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { openDatabase } from 'react-native-sqlite-storage';

import CustomInputText from '../Assets/Components/CustomInputText';
import CustomButton from '../Assets/Components/CustomButton';

let errorCB = (err) => {
    console.log("SQL ERROR: " + err)
};

let SuccessCB = () => {
    console.log("Opened UsersDatabase!")
};

var db = openDatabase({ name: 'Users.db'}, SuccessCB, errorCB);

const Signup = ({ navigation }) => {
    let [inputUserName, setInputUserName] = useState('');
    let [inputPassword, setInputPassword] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');


    function generate_token(length){
        //edit the token allowed characters
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    let register_info = () => {
        console.log(inputUserName, inputPassword, firstName, lastName);

        if(!inputUserName){
            alert('Please fill in username');
            return;
        }
        if(!inputPassword){
            alert('Please fill in password');
            return;
        }
        if(!firstName){
            alert('Please fill in First Name');
            return;
        }
        if(!lastName){
            alert('Please fill in Last Name');
            return;
        }
        let token = generate_token(64)
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO users_table (user_name, user_password, first_name, last_name, user_token) VALUES (?, ?, ?, ?, ?)',
            [inputUserName, inputPassword, firstName, lastName, token],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Login'),
                                },
                            ],
                            { cancelable: false}
                        );
                    } else alert('Registration Failed');
                }
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient 
            colors={['purple', 'darkblue']}
            style={styles.mainContent}
            >
                <View style={styles.sectionStyling}>
                    <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle}>
                        <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.keyboardStyle}
                        >
                        <Text style={styles.title}>Enter Credentials</Text>
                        <View style={styles.inputTextBody}>
                            <View style={styles.inputTextContainer}>
                                <View style={styles.accidentalPressView}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Text style={styles.accidentalPressText}>Tap here to go back!</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputTextView}>
                                    <Text style={styles.inputTextTitle}>Username:</Text>
                                    <TextInput 
                                        style={styles.inputTextStyle}
                                        onChangeText={(inputUserName) => setInputUserName(inputUserName)}
                                        underlineColorAndroid="#FFFFFF"
                                        placeholder="Username Here!"
                                        placeholderTextColor="white"
                                        keyboardType="default"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                        secureTextEntry={true}
                                    />
                                    {/* <CustomInputText 
                                        placeholder="Username"
                                        placeholderTextColor = "white"
                                        onChangeText={(inputUserName) => setInputUserName(inputUserName)}
                                        style={styles.inputTextStyle}
                                    /> */}
                                </View>
                            
                                <View style={styles.inputTextView}>
                                    <Text style={styles.inputTextTitle}>Password:</Text>
                                    <TextInput 
                                        style={styles.inputTextStyle}
                                        onChangeText={(inputPassword) => setInputPassword(inputPassword)}
                                        underlineColorAndroid="#FFFFFF"
                                        placeholder="Password Here!"
                                        placeholderTextColor="white"
                                        keyboardType="default"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                        secureTextEntry={true}
                                    />
                                    {/* <CustomInputText 
                                        placeholder="Password"
                                        placeholderTextColor = "white"
                                        onChangeText={(inputPassword) => setInputPassword(inputPassword)}
                                        style={styles.inputTextStyle}
                                    /> */}
                                </View>
                                <View style={styles.inputTextView}>
                                    <Text style={styles.inputTextTitle}>First Name:</Text>
                                    <TextInput 
                                        style={styles.inputTextStyle}
                                        onChangeText={(firstName) => setFirstName(firstName)}
                                        underlineColorAndroid="#FFFFFF"
                                        placeholder="First Name Here!"
                                        placeholderTextColor="white"
                                        keyboardType="default"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                        secureTextEntry={true}
                                    />
                                    {/* <CustomInputText 
                                            placeholder="First Name"
                                            placeholderTextColor = "white"
                                            onChangeText={(firstName) => setFirstName(firstName)}
                                            style={styles.inputTextStyle}
                                    /> */}
                                </View>
                                <View style={styles.inputTextView}>
                                    <Text style={styles.inputTextTitle}>Last Name:</Text>
                                    <TextInput 
                                        style={styles.inputTextStyle}
                                        onChangeText={(lastName) => setLastName(lastName)}
                                        underlineColorAndroid="#FFFFFF"
                                        placeholder="Last Name Here!"
                                        placeholderTextColor="white"
                                        keyboardType="default"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                        secureTextEntry={true}
                                    />
                                    {/* <CustomInputText 
                                            placeholder="Last Name"
                                            placeholderTextColor = "white"
                                            onChangeText={(lastName) => setLastName(lastName)}
                                            style={styles.inputTextStyle}
                                    /> */}
                                </View>



                            </View>

                            {/* <CustomButton title="Submit" customClick={register_info}/> */}
                        </View>
                        
                        <View style={styles.submitButton}>
                                    <TouchableOpacity onPress={() => register_info()}>
                                        <Text style={styles.submitButtonText}>Submit</Text>
                                    </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>

                </View>
            </LinearGradient>
        </SafeAreaView>
    )

};

export default Signup;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },

    mainContent: {
        height: '100%',
        width: '100%',
    },

    scrollViewStyle: {
        height: '100%',
        width: '100%',
    },

    keyboardStyle: {
        height: '100%',
        width: '100%',
    },

    title: {
        marginTop: 25,
        fontSize: 40,
        fontFamily: 'Arial',
        fontWeight: "bold",
        borderColor: 'gold',
        borderRadius: 30,
        borderWidth: 5,
        marginLeft: 5,
        backgroundColor: 'rgba(0, 0, 0, .25)',
        textAlign: 'center',
        color: 'white',
        padding: 20,
        width: 400,
        height: 100,
        alignSelf: 'center',
    },

    inputTextBody: {
        marginTop: 20,
        alignSelf: 'center',
        width: 350,
        height: 500,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: 20,
        justifyContent: 'center',
    },

    inputTextContainer: {
        marginTop: 30,
        width: 350,
        height: 500,
    },

    accidentalPressView: {
        height: 25,
        width: 150,
        alignSelf: 'flex-end',
        marginRight: 20,
        borderRadius: 5,
        borderColor: '#8109B7',
        borderWidth: 2,
    },

    accidentalPressText: {
        marginTop: 1,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 25,
        width: 150,
    },

    inputTextView: {
        width: 300,
        height: 100,
        alignSelf: 'center',
    },

    inputTextTitle: {
        marginTop: 15,
        color: 'white',
        width: 300,
        height: 30,
        fontSize: 20,
        marginBottom: 7,
    },

    inputTextStyle: {
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'gold',
    },

    submitButton: {
        marginTop: 20,
        alignSelf: 'center',
        height: 50,
        width: 200,
        backgroundColor: '#4A4DE7',
        borderRadius: 20,
        marginBottom: 20,
    },

    submitButtonText: {
        marginTop: 13,
        // height: 50,
        width: 200,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'arial',
        fontWeight: 'bold',
        color: 'white',
    },

});