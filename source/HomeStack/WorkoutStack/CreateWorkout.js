import React, { useState, useEffect } from 'react';
import { Text, Button, SafeAreaView, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker'

const CreateWorkout = ({ navigation }) => {
    let [date, setDate] = useState(new Date());
    let [stringDate, setStringDate] = useState('');

    let temp = date.toString().split(" ")
    let newDate = ""
    for (let i = 1; i < 4; i++){
        if (i === 3) {
            newDate = newDate + temp[i]
        }
        else {
            newDate = newDate + temp[i] + "-"
        }
        
    }

    return (
        <SafeAreaView>
            <View style={styles.mainContent}>

                <View style={styles.pickerView}>
                    <View style={styles.pickerTextView}>
                        <Text style={styles.pickerText}> Choose a date then select the workout</Text>
                    </View>
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                        mode="date"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonView}>
                        <Button title="Cardio Workout" color="purple" onPress={()=>navigation.navigate("CardioWorkout", {date : newDate})}/>
                    </View>

                    <View style={styles.buttonView}>
                        <Button title="Strength Workout" color="purple" onPress={()=>navigation.navigate("StrengthWorkout", {date : newDate})}/>
                    </View>

                    <View style={styles.buttonView}>
                        <Button title="Back" color="purple" onPress={()=>navigation.goBack()}/>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )

}

export default CreateWorkout;

const styles = StyleSheet.create({
    mainContent: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },

    pickerTextView: {
        height: 50,
        width: 300,
        backgroundColor: 'salmon',
        borderRadius: 10,
    },

    pickerText: {
        fontFamily: 'arial',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
        color: 'white'
    },

    pickerView: {
        height: 250,
        width: 350,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        marginTop: 20,
        height: 210,
        width: 275,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonView: {
        marginTop: 25,
        width: 200,
    },
});