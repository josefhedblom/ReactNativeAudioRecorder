import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Audio } from 'expo-av';
import axios from 'axios';
export default function AudioPlayer() {

    const [recordings, setRecordings] = useState([]);
    const [sound,            setSound] = useState();

    useEffect(() => {
        axios.get('http://192.168.1.31:6000/')
        .then(data => setRecordings(data.data.recordings))
        .catch(error => console.log(error.message));
    })

    showRecordings = ({}) => {}
    
    async function playRecording(path){
        const { sound } = await Audio.Sound.createAsync({
            uri: path
        });
        setSound(sound);
        await sound.playAsync();
    }
    async function pauseRecording(){}
    return (
        <View>
            <FlatList 
                data={} 
                renderItem={}  
                keyExtractor={}
            />
        </View>
    )
}
