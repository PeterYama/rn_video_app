import React, { Component, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video';
import base64 from 'react-native-base64'
import database from '@react-native-firebase/database';
import { Container } from 'native-base';

export default class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            decodedData: '',
            erroCode: ''
        };
    }

    componentDidMount() {
        database()
            .ref('/videos')
            .once('value')
            .then(snapshot => {
                this.setState({ userData: [...this.state.userData, snapshot.val()] })
                this.setState({ decodedData: base64.decode(this.state.userdata) })
                console.warn(this.state.userData)
            }).catch(e => {
                this.setState({ errorCode: e })
            })
    }

    renderItems() {
        this.state.userData.map(data => {
            console.warn(data.video3753.blob.type)
            return (
                <Text>{data.video3753.blob.type}</Text>
            )
        })
    }

    render() {
        return (
            <Container>
                <Text>Video Screen</Text>
                <Video source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    fullscreen={true}
                    style={styles.backgroundVideo} />
            </Container>
        )
    }
}

var styles = StyleSheet.create({
    backgroundVideo: {
        flex:1,
    },
});