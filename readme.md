# ChatApp 

## Goal
Developed the ChatGPT App that user can directly speak with chatGPT without tpying
## Start

```bash 
##init project 
npx react-native init ChatApp  

##install package 
cd ChatApp  
##intall axios
yarn add axios 
##install Geoloation 
yarn add react-native-geolocation-service

##  install dotnet to hidden api key 
yarn add react-native-dotenv
```
Configuring react-native-dotenv with Bable
```bash
## Add the following to your .babel.config.js file:
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['module:react-native-dotenv']
  };
};
```

# Add permission of using location 
In AndroidManifest.xml add 
```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```
# Run

```
npx react-native run-android 
npx react-native start
```
# 


#Video Demo


# Upload to Github by github cli 

```
# create a remote repository from the current directory
gh repo create my-project --private --source=. --remote=upstream
git remote add origin https://github.com/kevin211005/my-project.git
git branch -M main
git push -u origin main
```

# Reference 
https://openweathermap.org/

# Demo Video 




https://user-images.githubusercontent.com/86145579/236086065-454c3958-418a-497c-86b2-df26592e0b46.mp4



