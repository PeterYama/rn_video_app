# rn_video_app

### The task:
  - Create a video app that record, upload, retrieve, and play videos using react-native and firebase

### My approach:
 - Create Navigation using react-stack-navigation
 - Create Camera View using react-native-camera
 - Create a list view page using Flatlist
 - Create a Video Player using react-native-video

### Application flow:
  - User Opens app
  - User start recording
  - User proceed to the list view
  - User watch the video from remote database

### Development:
  - Started a development server using bare react native
  - Started a new application on firebase dashboard
  - Configured Firebase
  - Created src/views and added pages files
  - Configured Stack navigation on app.js

### Challenges
  - Library conflicts
  - Lack of Time
  - Unexpected errors
  - encoding / decoding
  
### Camera View
![drawing](https://i.imgur.com/SxBzgEo.png) 
### List 
![drawing](https://i.imgur.com/xNPHVlj.png)
### Video Player
![drawing](https://i.imgur.com/HTpx9er.png)

### Comments:
  - The application could not be tested on a Mac Environment. 
  - Video File is being encoded as base64
  - Only 1 second video can be registered in the real-time database (free tier)

### Todo:
  - Research on better video compression
  - Make the application read and write multiple videos
  - Add extra features

### Backup
  - https://github.com/PeterYama/rn_video_app_backup
