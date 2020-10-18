import React, { useState } from 'react'
import { View, Text } from 'react-native'
import database from '@react-native-firebase/database';

// const [data,setData] = useState[{}]

function getAllVideos() {
    database()
        .ref('/videos')
        .once('value')
        .then(snapshot => { console.warn(snapshot.val()) })
}


export default function ListView() {
    const result = getAllVideos();
    return (
        <View>
            <Text>Another View</Text>
        </View>
    )
}
