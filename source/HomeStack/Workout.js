import React, { useEffect } from 'react';
import { Text, Button, View, SafeAreaView, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';

let errorCB = (err) => {
    console.log("SQL ERROR: " + err)
};

let SuccessCB = () => {
    console.log("Opened WorkoutDatabase!")
};

let db = openDatabase({ name: 'Workout.db'}, SuccessCB, errorCB);

const Workout = ({ navigation }) => {
    useEffect(() => {
        createTables();
        db.transaction(function (transaxion) {
            let createSQLStatement = `CREATE TABLE IF NOT EXISTS main_workout(
                workout_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                workout_date VARCHAR(20) NOT NULL,
                cardio_id VARCHAR(20),
                strength_id VARCHAR(20),
                user_token VARCHAR(255) NOT NULL)`;
            transaxion.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='main_workout'", 
                [],
                function (transacion, results) {
                    if (results.rows.length == 0) {
                        transaxion.executeSql('DROP TABLE IF EXISTS main_workout', []);
                        transaxion.executeSql(createSQLStatement,
                            []
                        );
                    }
                }
            );
        });

        db.transaction(function (transaxion) {
            let createSQLStatement = `CREATE TABLE IF NOT EXISTS workout_cardio(
                cardio_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                workout_date VARCHAR(255) NOT NULL,
                cardio_muscle_group VARCHAR(255) NOT NULL,
                cardio_muscle VARCHAR(255) NOT NULL,
                cardio_duration INTEGER(20) NOT NULL,
                cardio_duration_type VARCHAR(255) NOT NULL,
                cardio_resistance INTEGER(10) NOT NULL,
                cardio_resistance_type VARCHAR(255) NOT NULL,
                cardio_distance INTEGER(10) NOT NULL,
                cardio_distance_type VARCHAR(255) NOT NULL,
                cardio_calories_burned INTEGER(10) NOT NULL,
                cardio_heart_rate INTEGER(4) NOT NULL,
                cardio_heart_rate_type VARCHAR(255) NOT NULL,
                user_token VARCHAR(255) NOT NULL,
                main_to_cardio VARCHAR(255) NOT NULL)`;
            transaxion.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='workout_cardio'", 
                [],
                function (transacion, results) {
                if (results.rows.length == 0) {
                    transaxion.executeSql('DROP TABLE IF EXISTS workout_cardio', []);
                    transaxion.executeSql(createSQLStatement,
                        []
                    );
                }
                }
            );
        });

        db.transaction(function (transaxion) {
            let createSQLStatement = `CREATE TABLE IF NOT EXISTS workout_strength(
                strength_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                workout_date VARCHAR(20) NOT NULL,
                strength_muscle_group VARCHAR(20) NOT NULL,
                strength_muscle VARCHAR(20) NOT NULL,
                strength_duration INTEGER(20) NOT NULL,
                strength_duration_type VARCHAR(20) NOT NULL,
                strength_repetition VARCHAR(20) NOT NULL,
                strength_repetition_type VARCHAR(20) NOT NULL,
                strength_resistance INTEGER(10) NOT NULL,
                strength_resistance_type VARCHAR(20) NOT NULL,
                strength_calories_burned INTEGER(10) NOT NULL,
                strength_heart_rate INTEGER(10) NOT NULL,
                strength_heart_rate_type VARCHAR(20) NOT NULL,
                user_token VARCHAR(255) NOT NULL,
                main_to_strength VARCHAR(255) NOT NULL)`;
            transaxion.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='workout_strength'", 
                [],
                function (transacion, results) {
                if (results.rows.length == 0) {
                    transaxion.executeSql('DROP TABLE IF EXISTS workout_strength', []);
                    transaxion.executeSql(createSQLStatement,
                        []
                    );
                }
                }
            );
        });

    }, []);

    const createTables = () => {

        db.transaction(function (transaxion) {
            let createSQLStatement = `CREATE TABLE IF NOT EXISTS workout_videos(
                video_id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_type VARCHAR(20),
                workout_uri VARCHAR(20)`;
            transaxion.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='workout_videos'", 
                [],
                function (transacion, results) {
                if (results.rows.length == 0) {
                    transaxion.executeSql('DROP TABLE IF EXISTS workout_videos', []);
                    transaxion.executeSql(createSQLStatement,
                        []
                    );
                }
                }
            );
        });

        db.transaction(function (transaxion) {
            let createSQLStatement = `CREATE TABLE IF NOT EXISTS workout_dates(
                date_id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_date VARCHAR(20),
                user_token VARCHAR(255)`;
            transaxion.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='workout_dates'", 
                [],
                function (transacion, results) {
                if (results.rows.length == 0) {
                    transaxion.executeSql('DROP TABLE IF EXISTS workout_dates', []);
                    transaxion.executeSql(createSQLStatement,
                        []
                    );
                }
                }
            );
        });

    };

    


    return (
        <SafeAreaView >
            <View style={styles.container}>
                <View style={styles.mainArea}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonViews}>
                            <Button color="purple" title="Create Workout" onPress={() => navigation.navigate('Create Workout')}/>
                        </View>

                        <View style={styles.buttonViews}>
                            <Button color="purple" title="Edit Workout" onPress={() => navigation.navigate('Edit Workout')}/>
                        </View>

                        <View style={styles.buttonViews}>
                            <Button color="purple" title="Remove Workout" onPress={() => navigation.navigate('Remove Workout')}/>
                        </View>

                        <View style={styles.buttonViews}>
                            <Button color="purple" title="Workout History" onPress={() => navigation.navigate('Workout History')}/>
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )

}

export default Workout;

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'pink',
        
    },

    mainArea: {
        marginTop: 125,
        alignSelf: 'center',
        height: 350,
        width: 350,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonContainer: {
        marginTop: 50,
    },

    buttonViews: {
        width: 300,
        height: 20,
        marginBottom: 60,
        borderRadius: 10,
    },

    buttonStyle: {
        color: 'orange'
    },

})