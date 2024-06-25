// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';

// // Liste des notes et des fichiers audio correspondants
// const NOTES = [
//   { note: 'DO', file: require('../../assets/sounds/DO.mp3')},
//   { note: 'RE', file: require('../../assets/sounds/RE.mp3')},
//   { note: 'MI', file: require('../../assets/sounds/MI.mp3')},
//   { note: 'FA', file: require('../../assets/sounds/FA.mp3')},
//   { note: 'SOL', file: require('../../assets/sounds/SOL.mp3')},
//   { note: 'LA', file: require('../../assets/sounds/LA.mp3')},   
//   { note: 'SI', file: require('../../assets/sounds/SI.mp3')},
//   // Ajoutez d'autres notes ici
// ];

// const Piano = () => {
//     const playSound = async (audioFile) => {
//         const { sound } = await Audio.Sound.createAsync(audioFile);
//         await sound.playAsync();
//       }
      
//     return (
//         <View style={styles.container}>
//           {NOTES.map(({ note, file }, index) => (
//             <TouchableOpacity key={index} style={styles.key} onPress={() => playSound(file)}>
//               <Text style={styles.noteText}>{note}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       );
// }

// export default Piano

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//     },
//     key: {
//       margin: 1,
//       width: 50,
//       height: 200,
//       backgroundColor: '#000',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     noteText: {
//       color: '#fff',
//       fontSize: 18,
//       fontWeight: 'bold',
//     }
//   });