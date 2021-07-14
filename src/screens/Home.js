import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons';
import axios from 'axios'
import one from '../../assets/one.png'
import two from '../../assets/two.png'
import three from '../../assets/three.png'
import four from '../../assets/four.png'
import five from '../../assets/five.png'
const images=[one,two,three,four,five]
const Home = ({place}) => {

    const [city, setCity] = useState('');
    const [weather,setWeather]=useState({})
    const [randomImage, setRandomImage] = useState(images[0])
    const [loading, setLoading] = useState(false)
    const API_key = '260f7d0edd1514a4908aed574b2e37a0'
    const getWeather = async () => {
        if (!city.trim()) return
        setLoading(true)
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`)
            setWeather(res.data)
            console.log(res.data)
            const n = Math.floor(Math.random()*images.length)
            setRandomImage(images[n])
            setLoading(false)
        } catch (error) {
            alert('Enter the city name correctly!')
        }
    }

    return (
        <ImageBackground source={randomImage} style={styles.image} imageStyle={{opacity:0.8}}>
            <SafeAreaView style={{ flex: 1 }}>
              <Text style={styles.paragraph}>{place}</Text> 
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={city}
                        placeholder=' city name'
                        onChangeText={(text) => setCity(text)}
                       
                    />
                     
                      <Feather  onPress={getWeather}  name="check-circle" size={24} color="grey" />
                  
                 
                </View>
                {Object.keys(weather).length>0?
                <> 
            <View style={styles.locationContainer}>
                <Text style={styles.location}>
                   {weather?.name} , {weather?.sys?.country}
                </Text>

            </View >

            <View style={styles.weatherContainer}>
                <Text style={styles.temp}>
                    {Math.round(weather.main.temp)} °C
                </Text>
                <Text style={styles.weather}>
                    {weather.weather[0].main}</Text>
            </View>
            </>
            :null}
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Home


const styles = StyleSheet.create({
    image: {
        flex: 1
    },
    paragraph:{
            fontSize: 18,
    textAlign: 'center',
    color:'#FFF',
    fontWeight:'bold',
    textShadowColor:'rgba(0,0,0,0.75)',
     textShadowOffset:{width:-3,height:3},
     textShadowRadius:10,
     marginTop:40,
     marginVertical:20
    },
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '60%',
        justifyContent: 'space-around'
    },
    textInput: {
      
        width: '50%',
        height: 40,
        fontWeight: '600'
    },
    
    locationContainer:{
      marginVertical:15  
    },
    location:{
        color:'white',
        fontSize:35,
        fontWeight:'500',
        textAlign:'center',
        textShadowColor:'rgba(0,0,0,0.55)',
        textShadowOffset:{width:-1,height:1},
        textShadowRadius:5,
    },
    weatherContainer: {
        alignItems:'center',
        
    },
    temp:{
        textAlign:'center',
        color:'#FFF',
        fontSize: 100,
        fontWeight:'800',
        backgroundColor:'rgba(255,255,255,0.2)',
         paddingVertical:20,
         paddingHorizontal:30,
         borderRadius:30,
         overflow:'hidden',
         marginTop:10,
         textShadowColor:'rgba(0,0,0,0.75)',
         textShadowOffset:{width:-3,height:3},
         textShadowRadius:10,
    },
    weather:{
        textAlign:'center',
        color:'#FFF',
        fontSize:48,
        fontWeight:'700',
        // shadowColor:'#000000',
  
        // shadowOffset:{
        //     width:-3,
        //     height:3,
        // },
        
        // shadowOpacity:0.7,
        textShadowColor:'rgba(0,0,0,0.75)',
         textShadowOffset:{width:-3,height:3},
         textShadowRadius:10,
    }
    
})