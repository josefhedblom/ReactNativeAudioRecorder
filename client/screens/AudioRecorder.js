import React, { useState, useEffect } from 'react'
import { View, Text, Alert, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import { Audio } from 'expo-av';
import axios from 'axios';
import { timeConverter } from '../helpers/timeConverter'
export default function AudioRecorder() {

    const [recording,         setRecording]   = useState(false);
    const [recordingUri,   setRecordingUri]   = useState();
    const [recordings,        setRecordings]  = useState([]);
    const [sound,                 setSound]   = useState()
    const [timer,                 setTimer]   = useState(0)

    useEffect(() => {
      getUserPermisson()
    },[])


    function alertMessage(msg){
        Alert.alert(
            `${msg[0].method}`,
            `${msg[0].message}`,
            [
              { text: "OK", onPress: () => console.log(`${msg[0].method}`) }
            ]
        );
    }
    async function getUserPermisson(){
    const permisson = await Audio.getPermissionsAsync();
        if(permisson.granted){
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
        }
    }
    async function startRecording(){
        try {
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
        } catch (err) {
            alertMessage([{method: 'Recording', message:'Failed to start recording', text: err.message}])
        }
    }
    async function stopRecording(){
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        setRecordingUri(recording.getURI());
        const title = new Date()
        setRecordings(prevState => [...prevState, {title: title, uri:recording.getURI()}] );
    }

    async function playRecording(){
        const { sound } = await Audio.Sound.createAsync({
            uri: recordingUri
        });
        setSound(sound);
        await sound.playAsync();
        sound.getStatusAsync()
        .then((response) => setTimer(response.durationMillis))
    }
    async function pauseRecording(){
        await sound.pauseAsync();
    }
    async function saveRecording(){
        axios.post('http://192.168.1.31:6000/add',recordings)
        .then((response) => {
          if(response.status === 200){
            alertMessage([{method: 'Save Recording', message:'Recordning has been saved!'}])
          }
        })
        .catch(error => console.log(error.message)); // Add alert
    }

    function buttonsRecordAndPlay(){
      return(
        <TouchableOpacity style={styles.actionButtonsConatiner}>
          <Pressable style={styles.actionButtonsPressable}>
            <Text style={styles.actionButtonsText} onPress={recording ?  stopRecording  :  startRecording}>{recording ?  'STOP'  :  'RECORD'}</Text>
          </Pressable>
        </TouchableOpacity>
      )
    }
    function actionButtons(func){
      return(
        <TouchableOpacity style={styles.actionButtonsConatiner}>
          <Pressable style={styles.actionButtonsPressable}>
            <Text style={styles.actionButtonsText} onPress={() => func[0].method.call()}>{`${func[0].action}`}</Text>
          </Pressable>
        </TouchableOpacity>
      )
    }
    return (
        <View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:20}}>{timeConverter(timer)}</Text>
            </View>
            {buttonsRecordAndPlay()}
            {actionButtons([{method: () => playRecording(),  action: 'PLAY'}])}
            {actionButtons([{method: () => pauseRecording(), action: 'STOP'}])}
            {actionButtons([{method: () => saveRecording(),  action: 'SAVE'}])}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
    justifyContent:'center',
    alignItems:'center'
  },
  actionButtonsConatiner: {
    backgroundColor: '#726aa7', 
    marginTop:20
  },
  actionButtonsPressable: {
    width:300
  },
  actionButtonsText: {
    color:'white', 
    padding:10,
    textAlign:'center'
  }
});