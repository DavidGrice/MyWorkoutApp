import React, { useEffect, useState } from 'react';
import { Text, Button, View, SafeAreaView, StyleSheet, FlatList, ScrollView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';

let errorCB = (err) => {
    console.log("SQL ERROR: " + err)
};

let SuccessCB = () => {
    console.log("Opened WorkoutDatabase!")
};

let db = openDatabase({ name: 'Workout.db'}, SuccessCB, errorCB);

const WorkoutHistorySummary = ({ navigation, route }) => {
    let [flatListCardio, setFlatListCardio] = useState([]);
    let [flatListStrength, setFlatListStrength] = useState([]);
    let [userToken, setUserToken] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            let sqlStatement = `SELECT * FROM workout_cardio WHERE workout_cardio.workout_date = ?`

          tx.executeSql(sqlStatement, [route.params.date], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            console.log(temp)
            setFlatListCardio(temp);
          });
        });

        db.transaction((tx) => {
            let sqlStatement = `SELECT * FROM workout_strength WHERE workout_strength.workout_date = ?`

          tx.executeSql(sqlStatement, [route.params.date], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            console.log(temp)
            setFlatListStrength(temp);
          });
        });

        getAsyncData();

    }, []);

    const getAsyncData = async() => {
        try {
            AsyncStorage.getItem('userToken', function(errs, result) {
                if (!errs) {
                    if (result !== null) {
                    console.log('userToken' + result); /* it works */
                    }
                }
                }).then((userToken) => setUserToken(userToken));
        } catch(error) {
            console.log(error)
        }
    }

        let listViewItemSeparator = () => {
            return (
            <View
                style={styles.listViewItemSeparator}
            />
            );
        };


        let listItemCardioView = (item) => {
            return (

            <View
                key={item.user_token}
                style={styles.viewContainer}>
                
                <View style={styles.viewTitle}>
                    <Text style={styles.viewTitleText}>Cardio Workout </Text><Text style={styles.viewTitleText}>{item.cardio_id}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Muscle Group: </Text><Text style={styles.viewTextItem}>{item.cardio_muscle_group}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Muscle: </Text><Text style={styles.viewTextItem}>{item.cardio_muscle}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Duration: </Text><Text style={styles.viewTextItem}>{item.cardio_duration} {item.cardio_duration_type}</Text>
                </View>
                
                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Resistance: </Text><Text style={styles.viewTextItem}>{item.cardio_resistance} {item.cardio_resistance_type}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Distance: </Text><Text style={styles.viewTextItem}>{item.cardio_distance} {item.cardio_distance_type}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Calories Burned: </Text><Text style={styles.viewTextItem}>{item.cardio_calories_burned}</Text>
                </View>
            
                <View style={styles.viewRows}>
                    <Text  style={styles.viewText}>Heartrate: </Text><Text style={styles.viewTextItem}>{item.cardio_heart_rate} Beats Per {item.cardio_heart_rate_type}</Text>
                </View>
                
            </View>
            );
        };

    let listItemStrengthView = (item) => {

        return (
            <View
            key={item.user_token}
            style={styles.viewContainer}>

                <View style={styles.viewTitle}>
                    <Text style={styles.viewTitleText}>Strength Workout </Text><Text style={styles.viewTitleText}>{item.strength_id}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Muscle Group: </Text><Text style={styles.viewTextItem}>{item.strength_muscle_group}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Muscle: </Text><Text style={styles.viewTextItem}>{item.strength_muscle}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Duration: </Text><Text style={styles.viewTextItem}>{item.strength_duration} {item.strength_duration_type}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Resistance: </Text><Text style={styles.viewTextItem}>{item.strength_resistance} {item.strength_resistance_type}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Sets: </Text><Text style={styles.viewTextItem}>{item.strength_repetition_type}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Repetitions: </Text><Text style={styles.viewTextItem}>{item.strength_repetition}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Calories: </Text><Text style={styles.viewTextItem}>{item.strength_calories_burned}</Text>
                </View>

                <View style={styles.viewRows}>
                    <Text style={styles.viewText}>Heartrate: </Text><Text style={styles.viewTextItem}>{item.strength_heart_rate} Beats Per {item.strength_heart_rate_type}</Text>
                </View>

            </View>
        );
    };

    return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.backButton} >
            <Button title="Back" color='purple' onPress={() => navigation.goBack()}></Button>
        </View>
            <View style={styles.secondaryContainer}>
                <View style={styles.secondaryContainer}>
                    
                <FlatList
                    data={flatListCardio}
                    ItemSeparatorComponent={listViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemCardioView(item)}
                />

                <View style={styles.viewSpacer}></View>

                <FlatList
                    data={flatListStrength}
                    ItemSeparatorComponent={listViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemStrengthView(item)}
                />
                </View>
            </View>
    </SafeAreaView>
    )

}

export default WorkoutHistorySummary;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'pink',
    },

    secondaryContainer: {
        flex: 1,
    },

    backButton: {
        alignSelf: 'center',
        marginTop: 15,
        width: 200,
        height: 40,
        marginBottom: 10,
    },

    viewContainer:{
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 375,
        marginBottom: 10,
        borderRadius: 10,
    },

    viewSpacer: {
        width: 375,
        height: 20,
    },

    viewTitle: {
        marginTop: 7,
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        width: 200,
        backgroundColor: 'salmon',
        borderRadius: 5,
        marginBottom: 7,
    },

    viewTitleText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'arial',
        fontWeight: 'bold',
    },

    viewRows: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 18,
        backgroundColor: 'salmon',
        alignSelf: 'center',
        width: 350,
        borderRadius: 5,
        height: 50,
    },

    viewText: {
        fontSize: 16,
        paddingTop: 14,
        paddingLeft: 10,
        color: 'white',
        fontFamily: 'arial',
        fontWeight: 'bold',
    },

    viewTextItem: {
        fontSize: 16,
        paddingTop: 14,
        color: 'white',
        fontFamily: 'arial',
        fontWeight: 'bold',
    },

    itemViewSeparator: { 
        height: 10, 
        width: '100%', 
        backgroundColor: '#808080' 
    },
});