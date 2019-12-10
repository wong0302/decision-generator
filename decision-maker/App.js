import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, Alert, Dimensions, StyleSheet, Text, View } from 'react-native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

let api ='https://yesno.wtf/api/';

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        answer: "",
        image: "",
        title: true,
        buttonText: "Yes or No?"
        }
    }

    async fetchData() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
        throw Error(response.statusText);
        }
        const json = await response.json();
        this.setState({
        isLoading: false,
        answer: json.answer,
        image: json.image,
        title: false,
        buttonText: "Try Again?"
        });
    } catch (error) {
        console.log(error);
    }
    }

    async componentDidMount() {
    this.setState({
        isLoading: false,
    });
    }

    render() {
    if(this.state.isLoading){
        return(
        <View style={styles.container}>
            <ActivityIndicator/>
        </View>
        )
    }

    return (
        <View style={styles.container}>
        <Text style={styles.jay}>Jay's Decision Maker</Text>
            { this.state.title ?
            <Text style={styles.header}>Ask me a question and tap the button below.</Text> : null
            }
            { this.state.image ? <Image
                source={{uri:this.state.image}}
                // indicator={Progress.Circle}
                // indicatorProps={{
                // size: 80,
                // }}
                style={styles.picture}>
                <Text style={styles.answer}>{this.state.answer}</Text>
            </Image> : null }
            <TouchableOpacity
                onPress={() => this.fetchData()}
                >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{this.state.buttonText}</Text>
            </View>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e3f2fd',
    flex:1,
    justifyContent:"center",
    alignItems:"center"
    },
    header: {
    textAlign: 'center',
    fontSize: 32,
    padding: 20,
    },
    answer: {
    textAlign: 'center',
    color: '#e3f2fd',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 32,
    textTransform: 'uppercase'
    },
    button: {
    width: 260,
    alignItems: 'center',
    backgroundColor: '#304ffe', 
    borderRadius: 9
    },
    buttonText: {
    padding: 20,
    color: 'white',
    textTransform: 'uppercase'
    },
    picture: {
    justifyContent: 'center',
    resizeMode: 'cover',
    height: imageHeight,
    width: imageWidth,
    marginBottom: 30,
    },
    jay: {
      padding: 20,
      color: '#0026ca',
      fontSize: 40,
      textTransform: 'uppercase',
      textAlign: 'center',
      fontWeight: '200'
    }
});

export default App