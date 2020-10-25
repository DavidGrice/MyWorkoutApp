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

const EditWorkout = ({navigation, route}) => {
    let [flatListItems, setFlatListItems] = useState([]);
    let [userToken, setUserToken] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            let sqlStatement = `SELECT DISTINCT main_workout.workout_date, main_workout.user_token FROM main_workout
            LEFT JOIN workout_cardio ON workout_cardio.workout_date = main_workout.workout_date
                                        AND  workout_cardio.user_token = main_workout.user_token
            LEFT JOIN workout_strength ON workout_strength.workout_date = main_workout.workout_date
                                        AND  workout_strength.user_token = main_workout.user_token`

          tx.executeSql(sqlStatement, [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            console.log(temp)
            setFlatListItems(temp);
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


      let listItemView = (item) => {
          let textDate = item.workout_date.toString()
        return (
          <View
            key={item.user_token}
            style={styles.buttonDates}>
                <Button title={textDate} color="salmon" onPress={() => navigation.navigate("EditWorkoutHistory", { date: item.workout_date})}></Button>
          </View>
        );
      };

    return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.backButton} >
            <Button title="Back" color="purple" onPress={() => navigation.goBack()}></Button>
        </View>
            <View style={styles.secondaryContainer}>
                <View style={styles.secondaryContainer}>
                <FlatList
                    data={flatListItems}
                    ItemSeparatorComponent={listViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
                </View>
            </View>
    </SafeAreaView>
    )

}

export default EditWorkout;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'pink',
    },

    secondaryContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 375,
        marginBottom: 10,
        borderRadius: 10,
    },

    backButton: {
        alignSelf: 'center',
        marginTop: 15,
        width: 200,
        height: 40,
        marginBottom: 10,
    },

    buttonDates: {
        alignSelf: 'center',
        marginTop: 15,
        width: 300,
        height: 40,
        marginBottom: 10,
    },

    viewContainer:{
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 375,
        marginBottom: 10,
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

    viewRows: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 0,
        marginBottom: 18,
        backgroundColor: 'salmon',
        alignSelf: 'center',
        width: 350,
        borderRadius: 5,
    },

    viewText: {
        fontSize: 18,
        color: 'white',
    },

    itemViewSeparator: { 
        height: 10, 
        width: '100%', 
        backgroundColor: '#808080' 
    },
});