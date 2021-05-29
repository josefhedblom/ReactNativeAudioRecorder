import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Audio } from 'expo-av';
import axios from 'axios';
export default function AudioPlayer() {

    const [recordnings, setRecordings] = useState([]);
    const [sound,            setSound] = useState();

    useEffect(() => {
        axios.get('http://192.168.1.31:6000/')
        .then(data => setRecordings(data.data.recordnings))
        .catch(error => console.log(error.message));
    })

    showRecordings = ({}) => {}
    async function playRecordning(){}
    async function pauseRecordning(){}
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
