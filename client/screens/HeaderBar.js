import React from 'react'
import { View, Text } from 'react-native'
import { Header } from "react-native-elements";
export default function HeaderBar() {
    return (
        <View>
            <Header
                barStyle="default"
                centerComponent={{
                  text: "MY TITLE",
                  style: { color: "#fff" }
                }}
                containerStyle={{ width: '100%' }}
                leftComponent={{ icon: "menu", color: "#fff" }}
                placement="center"
                rightComponent={{ icon: "home", color: "#fff" }}
                />
        </View>
    )
}
