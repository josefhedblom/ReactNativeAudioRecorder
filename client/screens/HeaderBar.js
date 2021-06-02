import React        from 'react'
import { View }     from 'react-native'
import { Header }   from "react-native-elements";

export default function HeaderBar() {
    return (
        <View>
            <Header
                barStyle="default"
                centerComponent={{
                  text: "REACT NATIVE RECORDER",
                  style: { color: "#fff" }
                }}
                containerStyle={{ width: '100%' }}
                />
        </View>
    )
}
