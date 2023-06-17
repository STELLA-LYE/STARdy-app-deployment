//Code for stopwatch and timer with already set time for users 

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// importing library to use Stopwatch and Timer
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const FocusTimer = () => {

  //Stopwatch 
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [isTimerStart, setIsTimerStart] = useState(false);

  //45 minutes Timer 
  const [timerDuration45, setTimerDuration45] = useState(2700000);
  const [isTimerStart45, setIsTimerStart45] = useState(false);
  const [resetTimer45, setResetTimer45] = useState(false);

  //1 hour timer 
  const [timerDuration1, setTimerDuration1] = useState(3600000);
  const [isTimerStart1, setIsTimerStart1] = useState(false);
  const [resetTimer1, setResetTimer1] = useState(false);

  //1 hour 30 minutes timer 
  const [timerDuration13, setTimerDuration13] = useState(5400000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);




  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.container}>

      {/* <Header2/> */}

        {/* <Text style={styles.title}>
          Focus countdown timers and stopwatch
        </Text> */}
        {/* Stopwatch */}
        <View style={styles.section}>
        <Text style={styles.typeStop}>Stopwatch</Text>
        <Entypo name="stopwatch" size={24} color="#89AAFF" />
        </View>

        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            // To start
            reset={resetStopwatch}
            // To reset
            options={options}
            // Options for the styling
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}>
            <Text style={styles.buttonStop}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <Text style={styles.buttonStop}>RESET</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.section}>
        <Text style={styles.typeTimer}>Timer</Text>
        <MaterialCommunityIcons name="timer-sand" size={24} color="#FAB972" />
        </View>

        {/* Timer for 45 minutes   */}
        <View style={styles.sectionStyle}>

          <Timer
            totalDuration={timerDuration45}
            msecs
            // Time Duration
            start={isTimerStart45}
            // To start
            reset={resetTimer45}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {
              alert('Custom Completion Function');
            }}
            // Can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart45(!isTimerStart45);
              setResetTimer45(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart45 ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart45(false);
              setResetTimer45(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>

        {/* Timer for 1 hour   */}
        <View style={styles.sectionStyle}>
          <Timer
            totalDuration={timerDuration1}
            msecs
            // Time Duration
            start={isTimerStart1}
            // To start
            reset={resetTimer1}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {
              alert('Custom Completion Function');
            }}
            // Can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart1(!isTimerStart1);
              setResetTimer1(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart1 ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart1(false);
              setResetTimer1(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>


        {/* Timer for 1 hour 30 minutes   */}
        <View style={styles.sectionStyle}>
          <Timer
            totalDuration={timerDuration13}
            msecs
            // Time Duration
            start={isTimerStart}
            // To start
            reset={resetTimer}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {
              alert('Custom Completion Function');
            }}
            // Can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(!isTimerStart);
              setResetTimer(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart ? 'START' : 'STOP'}
            </Text>

          </TouchableHighlight>
          <TouchableHighlight 
            onPress={() => {
              setIsTimerStart(false);
              setResetTimer(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default FocusTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007788'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
    section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 30, 
    marginBottom: -50, 
    marginTop: -50, 
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
    //fontWeight: 'bold'
    color: '#FAB972'
  },
  buttonStop: {
    fontSize: 20,
    marginTop: 10,
    //fontWeight: 'bold'
    color: '#89AAFF'
  },
  typeStop: {
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#89AAFF', 
    marginRight: 10, 
  },
  typeTimer: {
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#FAB972', 
    marginRight: 10, 
  },
});

const options = {
  container: {
    backgroundColor: '#007788',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
    fontWeight: 'bold'
  },
};