import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Audio } from 'expo-av';
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
            console.error('Failed to start recording', err);
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
    async function pauseRecording(){}
    async function saveRecording(){}
    return (
        <View>
            <Text></Text>
        </View>
    )
}
