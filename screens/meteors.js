import axios from 'axios'
import React from 'react'
import {
StyleSheet,
Text,
View,
Button,
TouchableOpacity,
TextInput,
Image,
ImageBackground,
SafeAreaView,
Platform,
StatusBar,
FlatList,
Dimensions
} from 'react-native'

export default class MeteorsScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      meteors:{}
    }
  }

  getMeteors=()=>{
    axios
    .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=afH06KhvWFYbsqMDHIiwalZW1wXKqyWypL6ZZe2q')
    .then((response)=>{
        this.setState({
          meteors:response.data.near_earth_objects
    });
    
  })
  .catch((error)=>{
    alert(error.message)
  })
  }
  componentDidMount(){
    this.getMeteors()
  }

  keyExtractor= (item,index)=>{
      index.toString()
  }

  renderItem=({item})=>{
    let meteor=item
    let bg_img,speed,size
    if (meteor.threat_score<=30){
      bg_img= require('../assets/meteor_bg1.png')
      speed=require('../assets/meteor_speed1.gif')
      size=100
    }
    else if (meteor.threat_score<=75){
      bg_img=require('../assets/meteor_bg2.png')
      speed=require('../assets/meteor_speed2.gif')
      size=150
    }
    else{
      bg_img=require('../assets/meteor_bg3.png')
      speed=require('../assets/meteor_speed3.gif')
      size=200
    }
    return (
      <View>
      <ImageBackground source={bg_img} style={styles.backgroundImage}>
    
      <View style={styles.gifContainer}>
      <Image source={speed} style={{width:size,height:size,alignSelf:'center'}}>
      </Image>
      <View >
      <Text style={[styles.cardTitle,{marginTop:300,marginLeft:50}]}>
      {item.name}
      </Text>
      <View style={styles.listContainer}>
     
        <Text style={styles.cardText}>
         Closest to Earth -{item.close_approach_data[0].close_approach_date_full}
      </Text>

        <Text style={styles.cardText}>
        Minimum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}
      </Text>

        <Text style={styles.cardText}>
          Maximum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}
      </Text>

        <Text style={styles.cardText}>
        Velocity (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
      </Text>

        <Text style={styles.cardText}>
Missing Earth By (KM) - {item.close_approach_data[0].miss_distance.kilometers}
      </Text>
      </View>
      </View>
      </View>
      </ImageBackground>
      </View>
    )
  }
    render(){
      if (Object.keys(this.state.meteors).length==0){
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>
          Loading...
          </Text>
          </View>
        )
      }

      else{
        let meteor_arr= Object.keys(this.state.meteors).map((meteor_date)=>{
            return this.state.meteors[meteor_date]
        })
        let meteors= [].concat.apply([],meteor_arr)
        meteors.forEach(function (element){
          let diameter= (element.estimated_diameter.kilometers.estimated_diameter_min+ element.estimated_diameter.kilometers.estimated_diameter_max)/2
          let threatScore= (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
          element.threat_score=threatScore
        })

        meteors.sort(function (a,b){
            return b.threat_score-a.threat_score
        })

        meteors= meteors.slice(0,5)
        
     return(
            <View style={styles.container}>
            <SafeAreaView style={styles.android}/>
                <View style={styles.titleBar}>
            <Text style={styles.titleText}>
              Meteors List
            </Text>
            </View>
            <FlatList
            keyExtractor={this.keyExtractor}
            data={meteors}
            renderItem={this.renderItem}
            />
            </View>
   
        )
      }
   
    }
}

const styles= StyleSheet.create({
 container:{
flex:1
  },
  android:{
marginTop:Platform.OS== 'android'? StatusBar.currentHeight:0
  },
  gifContainer:{
justifyContent:'center',
alignItems:'center',
flex:1,
  },
  backgroundImage:{
    flex:1,
    resizeMode:'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  titleBar:{
justifyContent:'center',
alignItems:'center',
flex:1.8,
backgroundColor:'black'
  },
  titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'white'
  },
  cardTitle:{
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  },
  cardText:{
    color:'white'
  },
  listContainer:{
    justifyContent:'center',
    marginRight:10,
    marginLeft:10,
    marginTop:5,
    borderRadius:10,
    padding:10,
    backgroundColor:'rgba(52,52,52,0.5)'
  }
})
 