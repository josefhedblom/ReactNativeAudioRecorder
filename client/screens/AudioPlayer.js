import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { ListItem, Icon } from "react-native-elements";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
export default function AudioPlayer() {

    const [recordings, setRecordings] = useState([]);
    const [sound,           setSound] = useState();

    useEffect(() => {
        axios.get('http://192.168.1.31:6000/')
        .then((data)   => setRecordings(data.data.recordings))
        .catch(error => console.log(error.message));
    })

    showRecordings = ({ item }) => {
        return(
            <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title >{item.title} 
                  <Icon  name='play-arrow' type='material-icons'color='#000'size={30} onPress={() => playSavedRecording(item)}/>
                  <Icon  name='pause'      type='material-icons'color='#000'size={30} onPress={() => pauseSavedRecording()}/>
                  <Icon  name='clear'      type='material-icons'color='#000'size={30} onPress={() => deleteRecording(item)}/>
              </ListItem.Title>
              <ListItem.Subtitle>2021-05-31</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
    }

    function alertMessage(msg){
        Alert.alert(
            `${msg[0].method}`,
            `${msg[0].message}`,
            [
              { text: "OK", onPress: () => console.log(`${msg[0].method}`) }
            ]
        );
      }

    async function playSavedRecording(item){
        const { sound } = await Audio.Sound.createAsync({
            uri: item.uri
        });
        setSound(sound);
        await sound.playAsync();
    }

    async function pauseSavedRecording(){
        await sound.pauseAsync();
    }

    async function deleteRecording(item){
        try {
            await FileSystem.deleteAsync(
              item.uri
            );
            axios.delete(`http://192.168.1.31:6000/${item._id}`)
            .then((response) => console.log(response.status))
            alertMessage([{method: 'Delete Recording', message:'Recording has been deleted!'}])
          } catch (error) {
            console.log(error);
        }
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
