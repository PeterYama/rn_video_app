import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import database from '@react-native-firebase/database';

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    componentDidMount() {
        database()
            .ref('/videos')
            .once('value')
            .then(snapshot => {
                this.setState({ userData: [...this.state.userData, snapshot.val()] })
            });
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
            <View style={styles.container}>
                <Text>
                    {this.renderItems()}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
