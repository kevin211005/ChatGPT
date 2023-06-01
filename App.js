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
} from 'react-native';


class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewButtom}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() =>{}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewButtom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sendButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
});
export default App;
