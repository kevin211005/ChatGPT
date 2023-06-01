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
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends React.Component {
  render() {
    return (
        <ImageBackground 
          style={styles.backgroundImage}
          source={{uri:'https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png'}}
        >
          <View style={styles.viewButtom}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() =>{}}
              >
                <Icon name="microphone" size={30} color="#FFFFFF" />
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
  },
  viewButtom: {
    flex: 1,
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
