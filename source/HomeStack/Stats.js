import React, { useEffect, useState } from 'react';
import { Text, Button, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { LineChart, BarChart, ProgressCircle, YAxis, XAxis, Grid } from 'react-native-svg-charts'

let errorCB = (err) => {
    console.log("SQL ERROR: " + err)
};

let SuccessCB = () => {
    console.log("Opened WorkoutDatabase!")
};

let db = openDatabase({ name: 'Workout.db'}, SuccessCB, errorCB);

const Stats = ({ navigation, route }) => {
    let [strengthData, setStrengthData] = useState([]);
    let [userToken, setUserToken] = useState('');
    let [cardioDurationData, setCardioDurationData] = useState([]);
    let [cardioDistanceData, setCardioDistanceData] = useState([]);
    let [cardioResistanceData, setCardioResistanceData] = useState([]);
    let [cardioHeartRateData, setCardioHeartRateData] = useState([]);
    let [cardioDateData, setCardioDateData] = useState([]);

    let [strengthDurationData, setStrengthDurationData] = useState([]);
    let [strengthResistanceData, setStrengthResistanceData] = useState([]);
    let [strengthHeartRateData, setStrengthHeartRateData] = useState([]);
    let [strengthDateData, setStrengthDateData] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        const refreshScreen = refreshData();
        
        return () => refreshScreen;
      }, [])
    );
    
      const refreshData = () => {
        getAsyncData();

        console.log("Stats useFocusffect")
      };

    const getAsyncData = async() => {
      try {
          AsyncStorage.getItem('userToken', function(errs, result) {
              if (!errs) {
                  if (result !== null) {
                  console.log('userToken' + result); /* it works */
                  getCardioData(result)
                  getStrengthData(result)
                  }
              }
              });
      } catch(error) {
          console.log(error)
      }
  }

  let getCardioData = (userTokenOne) => {
    db.transaction((tx) => {
      let sqlStatement = `SELECT cardio.workout_date CardioDate, cardio.cardio_muscle_group CardioMuscleGroup, 
      cardio.cardio_muscle CardioMuscle, cardio.cardio_duration CardioDuration, cardio.cardio_duration_type DurationType,
      cardio.cardio_resistance CardioResistance, cardio.cardio_resistance_type CardioResistanceType,
      cardio.cardio_distance CardioDistance, cardio.cardio_distance_type CardioDistanceType,
      cardio.cardio_calories_burned CardioCalories, cardio.cardio_heart_rate CardioHeartRate,
      cardio.cardio_heart_rate_type CardioHeartRateType, cardio.user_token
      FROM workout_cardio cardio
      WHERE cardio.user_token = ?
      `
  
      tx.executeSql(sqlStatement, [userTokenOne], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        let duration = []
        let resistance = []
        let distance = []
        let rate = []
        let date = []
        let hals = Object.values(temp)
        for (let i = 0; i < hals.length; i++){
          if ( hals[i].CardioDurationType == 'Seconds') {
            hals[i].CardioDuration = hals[i].CardioDuration/60
          }
          if ( hals[i].CardioDurationType == 'Hours') {
            hals[i].CardioDuration = hals[i].CardioDuration*60
          }
          if ( hals[i].CardioResistanceType == 'Stone') {
            hals[i].CardioResistance = hals[i].CardioResistance*14
          }
          if ( hals[i].CardioResistanceType == 'Gallons') {
            hals[i].CardioResistance = hals[i].CardioResistance*8.34
          }
          if ( hals[i].CardioDistanceType == 'Feet') {
            hals[i].CardioDistance = hals[i].CardioDistance/5280
          }
          if ( hals[i].CardioDistanceType == 'Metres') {
            hals[i].CardioDistance = hals[i].CardioDistance/0.00062137119223733
          }
          if ( hals[i].CardioDistanceType == 'Kilometres') {
            hals[i].CardioDistance = hals[i].CardioDistance*0.62137
          }
          if ( hals[i].CardioDistanceType == 'Kilometres') {
            hals[i].CardioDistance = hals[i].CardioDistance*0.62137
          }
          if ( hals[i].CardioHeartRateType == 'Second') {
            hals[i].CardioHeartRate = hals[i].CardioHeartRate/60
          }
          if ( hals[i].CardioHeartRateType == 'Hour') {
            hals[i].CardioHeartRate = hals[i].CardioHeartRate*60
          }
          duration.push(hals[i].CardioDuration);
          resistance.push(hals[i].CardioResistance);
          distance.push(hals[i].CardioDistance);
          rate.push(hals[i].CardioHeartRate);
          date.push(hals[i].CardioDate)
        }
        let averageRate = 0;
        for (let i = 0; i < rate.length; i++) {
          averageRate += rate[i];
        }
        let average = averageRate / rate.length;
        average = average.toFixed(2)
  
        setCardioDurationData(duration);
        setCardioResistanceData(resistance);
        setCardioDistanceData(distance);
        setCardioHeartRateData(average);
        setCardioDateData(date);
      });
    });
  };

  let getStrengthData = (userTokenOne) => {
    db.transaction((tx) => {
      let sqlStatement = `SELECT strength.workout_date StrengthDate, strength.strength_muscle_group StrengthMuscleGroup, 
      strength.strength_muscle StrengthMuscle, strength.strength_duration StrengthDuration, 
      strength.strength_duration_type StrengthDurationType, strength.strength_resistance StrengthResistance, 
      strength.strength_resistance_type StrengthResistanceType, strength.strength_repetition StrengthRepetition,
      strength.strength_repetition_type StrengthRepetitionType, strength.strength_calories_burned StrengthCalories, 
      strength.strength_heart_rate StrengthHeartRate, strength.strength_heart_rate_type StrengthHeartRateType, strength.user_token
      FROM workout_strength strength
      WHERE strength.user_token = ?
      `
      

        tx.executeSql(sqlStatement, [userTokenOne], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          let duration = []
          let resistance = []
          let rate = []
          let date = []
          let hals = Object.values(temp)
          for (let i = 0; i < hals.length; i++){
            if ( hals[i].StrengthDurationType == 'Seconds') {
              hals[i].StrengthDuration = hals[i].StrengthDuration/60
            }
            if ( hals[i].StrengthDurationType == 'Hours') {
              hals[i].StrengthDuration = hals[i].StrengthDuration*60
            }
            if ( hals[i].StrengthResistanceType == 'Stone') {
              hals[i].StrengthResistance = hals[i].StrengthResistance*14
            }
            if ( hals[i].StrengthResistanceType == 'Gallons') {
              hals[i].StrengthResistance = hals[i].StrengthResistance*8.34
            }
            if ( hals[i].StrengthHeartRateType == 'Second') {
              hals[i].StrengthHeartRate = hals[i].StrengthHeartRate/60
            }
            if ( hals[i].StrengthHeartRateType == 'Hour') {
              hals[i].StrengthHeartRate = hals[i].StrengthHeartRate*60
            }
            duration.push(hals[i].StrengthDuration);
            resistance.push(hals[i].StrengthResistance);
            rate.push(hals[i].StrengthHeartRate);
            date.push(hals[i].StrengthDate);
          }
          let averageRate = 0;
          for (let i = 0; i < rate.length; i++) {
            averageRate += rate[i];
          }
          let average = averageRate / rate.length;
          average = average.toFixed(2);

          setStrengthDurationData(duration);
          setStrengthResistanceData(resistance);
          setStrengthHeartRateData(average);
          setStrengthDateData(date);
        });
      });
  };



  const FunctionalLineChart = ({data, title, yLabels}) => {
    const contentInset = { top: 20, bottom: 20 }
    return (
      <View style={styles.containerLine}>
          <View style={styles.mainViewLine}>
            <Text style={styles.mainTitleLine}>{title}</Text>
              <View style={styles.contentViewLine}>
                <YAxis
                  style={styles.yAxisStyleLine}
                  data={data}
                  contentInset={contentInset}
                  svg={{
                    fill: 'black',
                    fontSize: 10,
                  }}
                  numberOfTicks={4}
                  formatLabel={(value) => `${value} ${yLabels}`}
                />
                <LineChart
                  style={styles.lineChartStyleLine}
                  data={data}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  animate={true}
                  animationDuration={2000}
                  contentInset={contentInset}
                >
                  <Grid />
                </LineChart>
                <XAxis
                  style={styles.xAxisStyleLine}
                  spacingInner={0.01}
                  data={data}
                  formatLabel={(value, index) => `Day ${index+1}`}
                  contentInset={{ left: 20, right: 20 }}
                  svg={{ fontSize: 10, fill: 'black', rotation:0 }}
                />
              </View>
            </View>
        </View>
    )
  
  };

  const FunctionalBarChart = ({data, title, yLabels}) => {
    const fill = 'rgb(134, 65, 244)';
    return (
        <View style={styles.containerBarchart}>
          <View style={styles.mainViewBarchart}>
            <Text style={styles.mainTitleBarchart}>{title}</Text>
            <View >
            <YAxis
                  style={styles.yAxisStyleBarchart}
                  data={data}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: 'black',
                    fontSize: 14,
                  }}
                  numberOfTicks={4}
                  formatLabel={(value) => `${value} ${yLabels}`}
                />
              <BarChart style={styles.lineChartStyleBarchart} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
              </BarChart>
              <XAxis
                  style={styles.xAxisStyleBarchart}
                  spacingInner={0.01}
                  data={data}
                  formatLabel={(value, index) => `Day ${index+1}`}
                  contentInset={{ left: 20, right: 20 }}
                  svg={{ fontSize: 10, fill: 'black', rotation: 0 }}
                />
            </View>
          </View>
        </View>
    )
  };

  const FunctionalProgressCircle = ({bpm, title}) => {
    return (
        <View style={styles.containerProgressCircle}>
          <View style={styles.mainViewProgressCircle}>    
            <View style={styles.contentViewProgressCircle}>
              <Text style={styles.mainTitleProgressCircle}>{`${title}`}</Text>
              <Text style={styles.mainSubtitleProgressCircle}>{`${bpm} bpm`}</Text>
              <ProgressCircle style={styles.lineChartStyleProgressCircle} progress={1.0} progressColor={'green'} />
            </View>
          </View>
        </View>
    );
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.separatorView}></View>
      <View style={styles.mainTitleView}>
        <Text style={styles.mainTitleText}>Cardio</Text>
      </View>
      <View style={styles.separatorView}></View>
      <ScrollView>
        
        <FunctionalLineChart data={cardioDurationData} yLabels={"min"} title={"Duration"} />
        <FunctionalBarChart data={cardioResistanceData} yLabels={"lbs"} title={"Resistence"}/>
        <FunctionalProgressCircle bpm={cardioHeartRateData} title={"Average Heart Rate"}/>
      </ScrollView>
      <View style={styles.separatorView}></View>
      <View style={styles.mainTitleView}>
        <Text style={styles.mainTitleText}>Strength</Text>
      </View>
      <View style={styles.separatorView}></View>
      <ScrollView>
      
        <FunctionalLineChart data={strengthDurationData} yLabels={"min"} title={"Duration"} />
        <FunctionalBarChart data={strengthResistanceData} yLabels={"lbs"} title={"Resistence"}/>
        <FunctionalProgressCircle bpm={strengthHeartRateData} title={"Average Heart Rate"}/>
        <View style={styles.separatorView}></View>
      </ScrollView>

  </View>
  
  )

}

export default Stats;

const styles = StyleSheet.create({

  backgroundContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'orange',
  },

  separatorView: {
    height: 10, 
    width: '100%'
  },

  mainTitleView: {
    alignSelf: 'center',
    width: 125,
    height: 30,
    backgroundColor: '#19b7d4',
    borderRadius: 10,
  },

  mainTitleText: {
    fontSize: 20,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },

  // LINECHARTS

  containerLine: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },

  mainViewLine: {
    height: 240, 
    width: 400, 
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    borderRadius: 10,
    opacity: 50
  },

  mainTitleLine: {
    fontSize: 20,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },

  contentViewLine: {
    height: 200, 
    width: 400, 
    alignSelf: 'flex-start',
  },

  yAxisStyleLine: {
    height: 200,
    alignSelf: 'flex-start',
  },

  lineChartStyleLine: {
    height: 200, 
    width: 360, 
    position: "absolute", 
    marginLeft: 35,
  },

  xAxisStyleLine: {
    fontSize: 20, 
    marginTop: -10, 
    height: 20, 
    width: 360, 
    marginLeft: 30, 
    alignSelf: 'flex-start', 
    flexDirection: 'row',
  },

  // BARCHART

  containerBarchart: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },

  mainViewBarchart: {
    height: 240, 
    width: 400, 
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    borderRadius: 10,
    opacity: 50
  },

  mainTitleBarchart: {
    fontSize: 20,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },

  contentViewBarchart: {
    height: 200, 
    width: 400, 
    alignSelf: 'flex-start',
  },

  yAxisStyleBarchart: {
    alignSelf:'flex-start', 
    paddingLeft: 4 ,
  },

  lineChartStyleBarchart: {
    height: 200, 
    width: 350, 
    alignSelf:'flex-end', 
    position: 'absolute' ,
  },

  xAxisStyleBarchart: {
    width: 350, 
    marginTop: -30, 
    alignSelf:'flex-end',
  },

  // PROGRESS CIRCLE

  containerProgressCircle: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },

  mainViewProgressCircle: {
    height: 240, 
    width: 400, 
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    borderRadius: 10,
    opacity: 50
  },

  mainTitleProgressCircle: {
    marginTop: 85,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },

  mainSubtitleProgressCircle: {
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },

  contentViewProgressCircle: {
    height: 200, 
    width: 400, 
    alignSelf: 'flex-start',
  },

  yAxisStyleProgressCircle: {
    alignSelf:'flex-start', 
    paddingLeft: 4 ,
  },

  lineChartStyleProgressCircle: {
    marginTop: 20,
    height: 200, 
    width: 350, 
    alignSelf:'center', 
    position: 'absolute' ,
  },

  xAxisStyleProgressCircle: {
    width: 350, 
    marginTop: -30, 
    alignSelf:'flex-end',
  },

});