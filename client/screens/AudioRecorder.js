import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Audio } from 'expo-av';
import axios from 'axios';
export default function AudioRecorder() {

    const [recording,         setRecording]   = useState(false);
    const [recordingUri,   setRecordingUri]   = useState();
    const [recordnings,     setRecordnings]   = useState([]);
    const [sound,                 setSound]   = useState()


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
            console.error('Failed to start recording', err); // Add alert
        }
    }
    async function stopRecording(){
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        setRecordingUri(recording.getURI());
        const title = new Date()
        setRecordnings(prevState => [...prevState, {title: title, uri:recording.getURI()}] );
    }

    async function playRecording(){
        const { sound } = await Audio.Sound.createAsync({
            uri: recordingUri
        });
        setSound(sound);
        await sound.playAsync();
    }
    async function pauseRecording(){
        await sound.pauseAsync();
    }
    async function saveRecording(){
        axios.post('http://192.168.1.31:6000/add',recordnings)
        .then(response => {
          if(response === 200){
            console.log('Added') // Add alert
          }
        })
        .catch(error => console.log(error.message)); // Add alert
    }
    return (
        <View>
            <Text></Text>
        </View>
    )
}
