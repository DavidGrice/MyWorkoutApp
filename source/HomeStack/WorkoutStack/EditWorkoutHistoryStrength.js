import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Button, ScrollView, Alert, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
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

const EditWorkoutHistoryStrength = ({ navigation, route }) => {
    let [muscleGroup, setMuscleGroup] = useState(route.params.strength_muscle_group)
    let [strengthMuscle, setStrengthMuscle] = useState(route.params.strength_muscle)
    let [strengthDuration, setStrengthDuration] = useState(route.params.strength_duration)
    let [strengthDurationType, setStrengthDurationType] = useState(route.params.strength_duration_type)
    let [strengthRepetition, setStrengthRepetition] = useState(route.params.strength_repetition)
    let [strengthRepetitionType, setStrengthRepetitionType] = useState(route.params.strength_repetition_type)
    let [strengthResistance, setStrengthResistance] = useState(route.params.strength_resistance)
    let [strengthResistanceType, setStrengthResistanceType] = useState(route.params.strength_resistance_type)
    let [strengthCalories, setStrengthCalories] = useState(route.params.strength_calories_burned)
    let [strengthHeartRate, setStrengthHeartRate] = useState(route.params.strength_heart_rate)
    let [strengthHeartRateType, setStrengthHeartRateType] = useState(route.params.strength_heart_rate_type)

    let inputStrengthWorkout = () => {
        
        if(!strengthDuration){
            alert('Please fill Cardio Duration');
            return;
        }
        if(!strengthResistance){
            alert('Please fill Cardio Resistance');
            return;
        }
        if(!strengthRepetition){
            alert('Please fill Cardio Distance');
            return;
        }
        if(!strengthCalories){
            alert('Please fill Cardio Calories');
            return;
        }
        if(!strengthHeartRate){
            alert('Please fill Cardio Heart Rate');
            return;
        }

        

        db.transaction(function (txn) {
            console.log('transaction')
            let createSQLStatement = `UPDATE workout_strength SET 
                workout_date = ?, strength_muscle_group = ?, strength_muscle = ?, strength_duration = ?, 
                strength_duration_type = ?, strength_resistance = ?, strength_resistance_type = ?, 
                strength_repetition = ?, strength_repetition_type = ?, strength_calories_burned = ?, 
                strength_heart_rate = ?, strength_heart_rate_type = ?, user_token = ? where strength_id = ?`;
            txn.executeSql(
            createSQLStatement,
            [route.params.workout_date, muscleGroup, strengthMuscle, 
            strengthDuration, strengthDurationType, strengthResistance, 
            strengthResistanceType, strengthRepetition, strengthRepetitionType, 
            strengthCalories, strengthHeartRate, strengthHeartRateType, route.params.user_token, route.params.strength_id],
            
            (txn, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Strength Updated successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate("Let's Workout"),
                            },
                        ],
                        { cancelable: false}
                    );
                    } else console.log('strength not updated');
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
                        <Text style={styles.textTitles}>Select Strength Group</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={muscleGroup}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setMuscleGroup(itemValue)
                        }>
                            <Picker.Item label="Machines" value="Machines" />
                            <Picker.Item label="Free Weights" value="Free Weights" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Select Strength Muscle</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={strengthMuscle}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setStrengthMuscle(itemValue)
                        }>
                            <Picker.Item label="Calves" value="Calves" />
                            <Picker.Item label="Hamstrings" value="Hamstrings" />
                            <Picker.Item label="Quadriceps" value="Quadriceps" />
                            <Picker.Item label="Gluteus Maximus" value="Gluteus Maximus" />
                            <Picker.Item label="Biceps" value="Biceps" />
                            <Picker.Item label="Triceps" value="Triceps" />
                            <Picker.Item label="Forearms" value="Forearms" />
                            <Picker.Item label="Trapezius" value="Trapezius" />
                            <Picker.Item label="Latissimus Dorsi" value="Latissimus Dorsi" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Duration</Text>
                        <CustomInputText 
                            placeholder={route.params.strength_duration.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.numberStyle}
                            onChangeText={(strengthDuration) => setStrengthDuration(strengthDuration)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Duration Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={strengthDurationType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setStrengthDurationType(itemValue)
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
                            placeholder={route.params.strength_resistance.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.numberStyle}
                            onChangeText={(strengthResistance) => setStrengthResistance(strengthResistance)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Resistance Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={strengthResistanceType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setStrengthResistanceType(itemValue)
                        }>
                            <Picker.Item label="Pounds" value="Pounds" />
                            <Picker.Item label="Stone" value="Stone" />
                            <Picker.Item label="Gallons" value="Gallons" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Repetitions</Text>
                        <CustomInputText 
                            placeholder={route.params.strength_repetition.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.numberStyle}
                            onChangeText={(strengthRepetition) => setStrengthRepetition(strengthRepetition)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Repetition Sets</Text>
                        <CustomInputText 
                            placeholder={route.params.strength_repetition_type.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.numberStyle}
                            onChangeText={(strengthRepetitionType) => setStrengthRepetitionType(strengthRepetitionType)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>Calories</Text>
                        <CustomInputText 
                            placeholder={route.params.strength_calories_burned.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.numberStyle}
                            onChangeText={(strengthCalories) => setStrengthCalories(strengthCalories)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>HeartRate</Text>
                        <CustomInputText 
                            placeholder={route.params.strength_heart_rate.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.numberStyle}
                            onChangeText={(strengthHeartRate) => setStrengthHeartRate(strengthHeartRate)}
                        />
                    </View>

                    <View style={styles.viewStyles}>
                        <Text style={styles.textTitles}>HeartRate Type</Text>
                        <View style={styles.pickerView}>
                        <Picker
                        selectedValue={strengthHeartRateType}
                        style={styles.pickerStyles}
                        onValueChange={(itemValue, itemIndex) =>
                            setStrengthHeartRateType(itemValue)
                        }>
                            <Picker.Item label="Second" value="Second" />
                            <Picker.Item label="Minute" value="Minute" />
                            <Picker.Item label="Hour" value="Hour" />
                        </Picker>
                        </View>
                    </View>

                    <View style={styles.backButton}>
                        <Button title="Submit" color="purple" onPress={inputStrengthWorkout}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

}

export default EditWorkoutHistoryStrength;

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