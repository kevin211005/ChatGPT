/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ActivityIndicator,
  View,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
  ToastAndroid,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import InfoDialog from './InformationDialog';
import Voice from '@react-native-voice/voice';
import { Configuration, OpenAIApi } from "openai";
import {OPENWEATHER_API_KEY, OPENAI_API_KEY} from '@env'
//const OPENAI_API_KEY = 'process.env.OPENAI_API_KEY';
//const WEATHER_API_KEY = 'process.env.WEATHER_API_KEY';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
      },
      dialogs : [],
      weather: '',
      responsed: true,
      backgroundUrl: 'https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png',
    };
    this.getLocation = this.getLocation.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.requestLocationPermission = this.requestPermission.bind(this);
    this.setBackGround = this.setBackGround.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.speechStartHandler = this.speechStartHandler.bind(this);
    this.speechEndHandler = this.speechEndHandler.bind(this);
    this.speechResultsHandler = this.speechResultsHandler.bind(this);
    this.sentMsgToChatGPT = this.sentMsgToChatGPT.bind(this);
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  componentDidMount() {
    this.getLocation()
    Voice.onSpeechStart = this.speechStartHandler;
    Voice.onSpeechEnd = this.speechEndHandler;
    Voice.onSpeechResults = this.speechResultsHandler;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location) {
      this.getWeather();
    } 
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  
  speechStartHandler(e) {
    console.log('speechStart successful', e);
  }
  speechEndHandler(e) {
    console.log('speechEnd successful', e);
  }
  speechResultsHandler(e) {
    console.log('speechResults successful', e);
    const msg = e.value[0];
    this.setState({
      dialogs: [...this.state.dialogs, msg],
      responsed: false,
    });
    this.sentMsgToChatGPT(msg);

  }
  async startRecord() {
    try {
      console.log('start record');
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  }
  async stopRecord() {
    try {
      console.log('stop record');
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 
   */
  async sentMsgToChatGPT(msg) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: msg}],
      });
      console.log(completion.data.choices[0].message.content);
      const response =  completion.data.choices[0].message.content.replaceAll('. ', '. \n');
      this.setState({
        dialogs: [...this.state.dialogs, response],
        responsed: true,
      });

    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Request location permission
   */
  async requestPermission() {
    try {
      const grants = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]
      );
      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
        console.log('Get all permission');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  /**
   * Get current location of this device 
   */
  getLocation() {
    const result = this.requestPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          }
          );
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      ToastAndroid.show('Cannot get permission', ToastAndroid.SHORT);
    }
    return 
  }
  /**
   * Get current weather by Geolocation
   */
  async getWeather() {
    const {latitude, longitude} = this.state.location;
    const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`;
    try {
      await axios.get(url)
      .then(response => {
        this.setState({
          weather: response.data.weather[0].main,
        });
        this.setBackGround(response.data.weather[0].id / 100);
      }).catch(error => {
        ToastAndroid.show('Internet Error', ToastAndroid.SHORT);
        console.log(error);
      });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Cannot get Weather', ToastAndroid.SHORT);
    }
  }
  /**
   *  Get background image by weather code
  */
  setBackGround(weatherCode) {
    url = "";
    switch (weatherCode) {
      case 2:
        url = "https://gray-wmtv-prod.cdn.arcpublishing.com/resizer/aZizA_0A8-Ca958n5EsGdNv3Dm4=/1200x1800/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/LARRIZM7UFJOZBL27NYSWT73JI.jpg";
        break;
      case 3:
        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR16aWAsFHyE7r5MldHVpCoRLld7CzJiCGhg&usqp=CAU";
        break;
      case 5:
        url = "https://s7d2.scene7.com/is/image/TWCNews/heavy_rain_jpg";
        break;
      case 6:
        ulr = "https://www.snowplowtalk.com/images/snowing-outside-today.jpg";
        break;
      case 7:
        url = "https://t4.ftcdn.net/jpg/01/30/67/15/360_F_130671558_d6qAenT7Fb7Nz2aQEA3enfnDNul3hILA.jpg";
        break;
      case 8:
        url = "https://www.todayifoundout.com/wp-content/uploads/2010/05/blue-sky.jpg";
        break;
      default:
        url = "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png";
        break;
    }
    this.setState({
      backgroundUrl: url,
    });
  }

  render() {
    return (
          <ImageBackground 
            style={styles.backgroundImage}
            source={{uri:this.state.backgroundUrl}}
          >
            <ScrollView
            nestedScrollEnabled = {true} 
            style={styles.container}>
              {this.state.dialogs.map((item, index) => {
                return <InfoDialog content={item} key={index}></InfoDialog>
              })}
            </ScrollView>
            <View style={styles.viewButtom}>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPressIn={() =>{this.startRecord()}}
                  onPressOut={() => {this.stopRecord()}}
                  disabled={!this.state.responsed}
                >
                  {this.state.responsed? 
                  <Icon name="microphone" size= {30} color= "white"/>
                  : <ActivityIndicator size="large" color="white" />}
                </TouchableOpacity>
            </View>
          </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    opacity:0.7,
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  viewButtom: {
    flex: 0.1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    opacity:1.2,
  },
  sendButton: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
});
export default App;
