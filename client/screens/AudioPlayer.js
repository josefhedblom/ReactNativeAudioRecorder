import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Audio } from 'expo-av';
export default function AudioPlayer() {

    const [recordnings, setRecordings] = useState([]);
    const [sound,            setSound] = useState();

    useEffect(() => {})

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
