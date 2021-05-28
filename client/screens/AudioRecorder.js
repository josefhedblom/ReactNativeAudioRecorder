import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Audio } from 'expo-av';
export default function AudioRecorder() {

    const [newRecordning, setNewRecordning] = useState(false);
    const [recordedUri,   setRecordedUri]   = useState();
    const [recordnings,   setRecordnings]   = useState([]);
    const [sound,         setSound]         = useState()


    async function startRecording(){}
    async function stopRecording(){}
    async function saveRecording(){}
    async function playRecording(){}
    async function pauseRecording(){}
    return (
        <View>
            <Text></Text>
        </View>
    )
}
