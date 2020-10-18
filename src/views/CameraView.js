'use strict';
import React, { useState, PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import database from '@react-native-firebase/database';
// import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch
window.fetch = new Fetch({
  auto: true,
  binaryContentTypes: [
    'image/',
    'video/',
    'audio/',
    'foo/',
  ]
}).build()

export default class CameraView extends PureComponent {
  render() {
    console.warn(this.props)
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takeVideo.bind()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Record </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takeVideo = async () => {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync({ maxDuration: 2 });
        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          this.upload(data.uri)
            .then(url => { this.setState({ fileUrl: url }) })
            .catch(error => console.log(error))
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  upload(path, mime = 'video/mp4') {
    const uri = path
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const imageRef = database()
    let uploadBlob = null
    return new Promise((resolve, reject) => {
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          this.setState({ encodedData : data})
          return Blob.build(data, { 
            type: `${mime};BASE64`,
        })})
        .then((blob) => {
          uploadBlob = blob
          return imageRef.ref('/videos/video'+ Math.floor(Math.random() * Math.floor(10000))).set({
            blob : uploadBlob,
            encodedData : this.state.encodedData,
          }, this.completedCallback())
        })
        .then(() => {
          console.warn("Success")
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  
  completedCallback() {
    this.props.navigation.navigate('ListView')
    console.warn('completed')
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
