import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native'; 

const styles = StyleSheet.create({ 
  button: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#333", 
    textAlign: "center", 
    maxWidth: 150 
  }
}); 
class FirebaseStorageUploader extends Component { 
  render () { 
    var button = <View style={[styles.button]}>
      <Text>Choose Photo</Text>
    </View> 
    return (button); 
  } 
} 
export default FirebaseStorageUploader;