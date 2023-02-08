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
  StatusBar,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
export default class ISSLocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  getISSlocation = () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  componentDidMount() {
    this.getISSlocation();
  }
  render() {
    //Object.Keys(JSON datastructure name ) returns an array that contains a list of all the keys in JSON
    if (Object.keys(this.state.location).length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.android} />
          <ImageBackground
            source={require('../assets/iss_bg.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>ISS Location</Text>
            </View>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}>
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}>
                  <Image
                    source={require('../assets/iss_icon.png')}
                    style={{ height: 50, width: 50 }}
                  />
                </Marker>
              </MapView>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}> Latitude - {this.state.location.latitude}</Text>
              <Text style={styles.infoText}> Longitude - {this.state.location.longitude}</Text>
              <Text style={styles.infoText}> Velocity (KPH) - {this.state.location.velocity}</Text>
              <Text style={styles.infoText}>Altitude (KM) - {this.state.location.altitude}</Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  android: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoText:{
    fontSize:20,
    color:'white',
    fontWeight:'bold'
  },
  infoContainer:{
    backgroundColor:'lightblue',
    flex:0.3,
    height:'5%',
    width:'100%',
    padding:30,
    borderTopLeftRadius:50,
    borderTopRightRadius:50
  }
});
