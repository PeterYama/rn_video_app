'use strict';
import React, { useState, PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import database from '@react-native-firebase/database';

const reference = database().ref('/videos');

export default class CameraView extends PureComponent {
    render() {
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
            const promise = this.camera.recordAsync({maxDuration:5});
            if (promise) {
              this.setState({ isRecording: true });
              const data = await promise;
              this.setState({ isRecording: false });
              this.upload(data);
              console.warn('takeVideo', data);
            }
          } catch (e) {
            console.error(e);
          }
        }
      };

    upload = async (video) => {
      const { uri } = video
      const blob = this.uriToBlob(uri)
      if (video !== null) {
        this.writeUserData(blob)
        console.warn('video data is: ' + uri)
      }else {
        console.warn('video is null')
      }
    }

    uriToBlob = (uri) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          // return the blob
          resolve(xhr.response);
        };
        
        xhr.onerror = function() {
          // something went wrong
          reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        
        xhr.send(null);
      });
    }

    writeUserData = (blob) => {
      database()
        .ref('/videos')
        .set({
        video : blob
      });
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
  