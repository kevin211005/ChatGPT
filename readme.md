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
```

# Add permission of using location 
In AndroidManifest.xml add 
```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
# Run

```
npx react-native run-android 
npx react-native start
```
# 

# Work flow 

1. Install all dependency 
2. Get device location by naive react-native api
3. Get Gcode from OpenWeather API
4. Get Weather from OpenWeather API with Gcode 

# Hours 
3 hr

# Challenges

Check the result of each asynchronous API call 

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



