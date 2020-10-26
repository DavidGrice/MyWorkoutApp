import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Button, ScrollView, Alert, StyleSheet, Keyboard } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import LinearGradient from 'react-native-linear-gradient';

import CustomInputText from '../../Assets/Components/CustomInputText';
import CustomButton from '../../Assets/Components/CustomButton';

let errorCB = (err) => {
    console.log("SQL ERROR: " + err)
};

let SuccessCB = () => {
    console.log("Opened WorkoutDatabase!")
};

let db = openDatabase({ name: 'Workout.db'}, SuccessCB, errorCB);

const EditWorkoutHistoryCardio = ({ navigation, route }) => {
    //cardio_id INTEGER PRIMARY KEY AUTOINCREMENT,
    let [cardioGroup, setCardioGroup] = useState(route.params.cardio_muscle_group)
    let [cardioMuscle, setCardioMuscle] = useState(route.params.cardio_muscle)
    let [cardioDuration, setCardioDuration] = useState(route.params.cardio_duration)
    let [cardioDurationType, setCardioDurationType] = useState(route.params.cardio_duration_type)
    let [cardioResistance, setCardioResistance] = useState(route.params.cardio_resistance)
    let [cardioResistanceType, setCardioResistanceType] = useState(route.params.cardio_resistance_type)
    let [cardioDistance, setCardioDistance] = useState(route.params.cardio_distance)
    let [cardioDistanceType, setCardioDistanceType] = useState(route.params.cardio_distance_type)
    let [cardioCalories, setCardioCalories] = useState(route.params.cardio_calories_burned)
    let [cardioHeartRate, setCardioHeartRate] = useState(route.params.cardio_heart_rate)
    let [cardioHeartRateType, setCardioHeartRateType] = useState(route.params.cardio_heart_rate_type)

    let inputCardioWorkout = () => {
        
        if(!cardioDuration){
            alert('Please fill Cardio Duration');
            return;
        }
        if(!cardioResistance){
            alert('Please fill Cardio Resistance');
            return;
        }
        if(!cardioDistance){
            alert('Please fill Cardio Distance');
            return;
        }
        if(!cardioCalories){
            alert('Please fill Cardio Calories');
            return;
        }
        if(!cardioHeartRate){
            alert('Please fill Cardio Heart Rate');
            return;
        }

        db.transaction(function (txn) {
            let createSQLStatement = `UPDATE workout_cardio SET 
                workout_date = ?, cardio_muscle_group = ?, cardio_muscle = ?, cardio_duration = ?, 
                cardio_duration_type = ?, cardio_resistance = ?, cardio_resistance_type = ?, 
                cardio_distance = ?, cardio_distance_type = ?, cardio_calories_burned = ?, 
                cardio_heart_rate = ?, cardio_heart_rate_type = ?, user_token = ? where cardio_id = ?`;
            txn.executeSql(
            createSQLStatement,
            [route.params.workout_date, cardioGroup, cardioMuscle, 
            cardioDuration, cardioDurationType, cardioResistance, 
            cardioResistanceType, cardioDistance, cardioDistanceType, 
            cardioCalories, cardioHeartRate, cardioHeartRateType, route.params.user_token, route.params.cardio_id],
            
            (txn, results) => {
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Cardio Updated successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate("Let's Workout"),
                            },
                        ],
                        { cancelable: false}
                    );
                    } else console.log('cardio not updated');
                }
            );
        });

    };

    return (
        <SafeAreaView>
            <View style={styles.mainArea}>
                <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollViewStyle}>
                    <View style={styles.backButton}>
                        <Button title="Back" color="purple" onPress={()=>navigation.goBack()}/>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Select Cardio Group</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={cardioGroup}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setCardioGroup(itemValue)
                        }>
                            <Picker.Item label="Low intensity, long duration" value="Low intensity, long duration" />
                            <Picker.Item label="Medium intensity, medium duration" value="Medium intensity, medium duration" />
                            <Picker.Item label="High intensity, short duration" value="High intensity, short duration" />
                            <Picker.Item label="Aerobic Interval Training" value="Aerobic Interval Training" />
                            <Picker.Item label="Anaerobic Interval Training" value="Anaerobic Interval Training" />
                            <Picker.Item label="Fartlek Training, or speed play" value="Fartlek Training, or speed play" />
                            <Picker.Item label="Circuit Training" value="Circuit Training" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Select Cardio Muscle</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={cardioMuscle}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setCardioMuscle(itemValue)
                        }>
                            <Picker.Item label="Upper Back" value="Upper Back" />
                            <Picker.Item label="Infraspinatus" value="Infraspinatus" />
                            <Picker.Item label="Triceps" value="Triceps" />
                            <Picker.Item label="Middle Back" value="Middle Back" />
                            <Picker.Item label="Lower Back" value="Lower Back" />
                            <Picker.Item label="Gluteus Maximus" value="Gluteus Maximus" />
                            <Picker.Item label="Hamstring Group" value="Hamstring Group" />
                            <Picker.Item label="Calf" value="Calf" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Duration</Text>
                        <CustomInputText 
                            style={styles.numberStyle}
                            placeholder={route.params.cardio_duration.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(cardioDuration) => setCardioDuration(cardioDuration)}
                        />
                    </View>
                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Duration Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={cardioDurationType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setCardioDurationType(itemValue)
                        }>
                            <Picker.Item label="Seconds" value="Seconds" />
                            <Picker.Item label="Minutes" value="Minutes" />
                            <Picker.Item label="Hours" value="Hours" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Resistance</Text>
                        <CustomInputText 
                            style={styles.numberStyle}
                            placeholder={route.params.cardio_resistance.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(cardioResistance) => setCardioResistance(cardioResistance)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Resistance Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={cardioResistanceType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setCardioResistanceType(itemValue)
                        }>
                            <Picker.Item label="Pounds" value="Pounds" />
                            <Picker.Item label="Stone" value="Stone" />
                            <Picker.Item label="Gallons" value="Gallons" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Distance</Text>
                        <CustomInputText 
                            style={styles.numberStyle}
                            placeholder={route.params.cardio_distance.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(cardioDistance) => setCardioDistance(cardioDistance)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Distance Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={cardioDistanceType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setCardioDistanceType(itemValue)
                        }>
                            <Picker.Item label="Feet" value="Feet" />
                            <Picker.Item label="Miles" value="Miles" />
                            <Picker.Item label="Metres" value="Metres" />
                            <Picker.Item label="Kilometres" value="Kilometres" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Calories</Text>
                        <CustomInputText 
                            style={styles.numberStyle}
                            placeholder={route.params.cardio_calories_burned.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(cardioCalories) => setCardioCalories(cardioCalories)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>HeartRate</Text>
                        <CustomInputText 
                            style={styles.numberStyle}
                            placeholder={route.params.cardio_heart_rate.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(cardioHeartRate) => setCardioHeartRate(cardioHeartRate)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>HeartRate Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={cardioHeartRateType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setCardioHeartRateType(itemValue)
                        }>
                            <Picker.Item label="Second" value="Second" />
                            <Picker.Item label="Minute" value="Minute" />
                            <Picker.Item label="Hour" value="Hour" />
                        </Picker>
                        </View>
                    </View>
                    <View style={styles.backButton}>
                        <Button title="Submit" color="purple" onPress={inputCardioWorkout}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

}

export default EditWorkoutHistoryCardio;

const styles = StyleSheet.create({
    mainArea: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'salmon',
    },

    backButton: {
        alignSelf: 'center',
        marginTop: 15,
        width: 200,
        height: 40,
        marginBottom: 15,
    },

    scrollViewStyle: {
        flexGrow: 1,
    },

    viewStyles: {
        alignSelf: 'center',
        marginTop: 15,
        width: 350,
        height: 110,
        borderRadius: 10,
        backgroundColor: 'white',
    },

    textTitles: {
        marginTop: 5,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'arial',
        color: 'black',

    },

    pickerView: {
        height: 50, 
        width: 300,
        marginTop: 5,
        alignSelf: "center",
        backgroundColor: 'pink',
        borderRadius: 10,
        marginBottom: 7,
    },

    pickerStyles: {
        height: 50, 
        width: 300,
        alignSelf: "center",
        borderRadius: 10,
        borderColor: 'gold',
        borderWidth: 1,
    },

    numberStyle: {
        height: 50,
        width: 300,
        backgroundColor: 'pink',
        borderRadius: 10,
        alignSelf: "center",
        fontSize: 16,
        textAlign: "left",
        fontWeight: 'bold',
        paddingLeft: 7,
        marginBottom: 7,
    },

});