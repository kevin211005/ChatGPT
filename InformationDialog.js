import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
export default function InfoDialog(props) {
    return (
          <ScrollView style={styles.viewMain}>
            <Text 
              multiline = {true}
              style= {styles.text}>{props.content}
            </Text>
          </ScrollView> 
      );
    }
const styles = StyleSheet.create({
    viewMain : {
        backgroundColor: '#171717',
        borderRadius: 10,
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },

    text: {
        color: 'white',
        fontSize: 20,
        marginStart: 10,
        marginEnd: 10,
        marginEnd: 10,
        fontWeight: 'bold',
    },
    });