import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { ListItem, Icon } from "react-native-elements";
import { Audio } from 'expo-av';
import axios from 'axios';
export default function AudioPlayer() {

    const [recordings, setRecordings] = useState([]);
    const [sound,           setSound] = useState();

    useEffect(() => {
        axios.get('http://192.168.1.31:6000/')
        .then(data   => setRecordings(data.data.recordings))
        .catch(error => console.log(error.message));
    })

    showRecordings = ({ item }) => {
        return(
            <ListItem bottomDivider onPress={() => playRecording(item.uri)}>
            <ListItem.Content>
              <ListItem.Title>{item.title} <Icon  name='play-arrow'  type='material-icons'color='#000'size={30}/></ListItem.Title>
              <ListItem.Subtitle>2021-05-27</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
    }

    async function playRecording(path){
        const { sound } = await Audio.Sound.createAsync({
            uri: path
        });
        setSound(sound);
        await sound.playAsync();
    }

    async function pauseRecording(){
        await sound.pauseAsync();
    }

    return (
        <View>
            <FlatList 
                data={recordings} 
                renderItem={showRecordings}  
                keyExtractor={item => item._id.toString()}
            />
        </View>
    )
}
