import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    SafeAreaView,
    Platform,
    StatusBar
  } from 'react-native';

  export default class HomeScreen extends React.Component{
    render(){
        return(

            <View style={styles.container}>
            <ImageBackground source={require('../assets/bg_image.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.android}/>
            <View style={styles.titleBar}>
                <Text style={styles.titleText}> ISS Tracker App </Text>
                
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    this.props.navigation.navigate('ISSLocation')
                }}>
                <Text style={styles.buttonText}> ISS Location </Text>
                <Text style={styles.knowMore}> {'Know More --->'}</Text>
                <Text style={styles.bgDigit}>1</Text>
                <Image source={require('../assets/iss_icon.png')} style={styles.iconImage}>
                  </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>{
                  this.props.navigation.navigate('Meteors')
                }}>
                <Text style={styles.buttonText}>Meteors</Text>
                <Text style={styles.knowMore}> {'Know More --->'}</Text>
                <Text style={styles.bgDigit}>2</Text>
                <Image source={require('../assets/meteor_icon.png')} style={styles.iconImage}>

                </Image>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
  }

  const styles= StyleSheet.create({
    container:{
      flex:1
    },
    titleText:{
      fontSize:40,
      color:'lavenderblush',
      fontFamily:'Candara',
      fontWeight:'bold',
      fontStyle:'italic'
    },
    android:{
      marginTop:Platform.OS=='android'? StatusBar.currentHeight: 0
    },
    titleBar:{
      flex:0.15,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'lightblue'
    },
    button:{
      marginTop:50,
      marginLeft:50,
      marginRight:50,
      borderRadius:30,
      backgroundColor:'white',
      flex:0.25
    },
    buttonText:{
      fontWeight:'bold',
      color:'black',
      fontSize:35,
      marginTop:75,
      paddingLeft:20
    },
    backgroundImage:{
      flex:1,
      resizeMode:'cover'
    },
    knowMore:{
        color:'red',
        fontSize:20,
        paddingLeft:30,

    },
    bgDigit:{
      position:'absolute',
      fontSize:150,
      color:'rgba(183,183,183,0.5)',
      right:20,
      bottom:-15,
      zIndex:-1
    },
    iconImage:{
      position:'absolute',
      height:200,
      width:200,
      resizeMode:'contain',
      right:20,
      top:-80,
 
    }
  })