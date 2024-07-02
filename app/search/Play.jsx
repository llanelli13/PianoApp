import { Alert, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import { downloadBlob } from '../../lib/dl_file'

const Play = () => {

    const { selectedObject } = useGlobalContext()

    const handleSoloClick = async () => {
      if (selectedObject && selectedObject.partition) {
          try {
              await downloadBlob(selectedObject.partition);
              Alert.alert("Succès", `Le fichier ${selectedObject.partition} a été téléchargé avec succès.`);
          } catch (error) {
              Alert.alert("Erreur", `Erreur lors du téléchargement du fichier ${selectedObject.partition}: ${error.message}`);
          }
      } else {
          Alert.alert("Erreur", "Aucun fichier de partition sélectionné.");
      }
  };

  const handleEducatifClick = async () => {
      if (selectedObject && selectedObject.partition) {
          try {
              await downloadBlob(selectedObject.partition);
              Alert.alert("Succès", `Le fichier ${selectedObject.partition} a été téléchargé avec succès.`);
          } catch (error) {
              Alert.alert("Erreur", `Erreur lors du téléchargement du fichier ${selectedObject.partition}: ${error.message}`);
              console.log(`Erreur lors du téléchargement du fichier ${selectedObject.partition}: ${error.message}`)
          }
      } else {
          Alert.alert("Erreur", "Aucun fichier de partition sélectionné.");
      }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView className="px-4 my-6">
            <Text className="text-white text-3xl font-psemi-bold mt-5">{selectedObject.title}</Text>
            <Text className="text-2xl text-gray-100 font-pregular mt-2">De {selectedObject.artiste}</Text>
            <Text className="text-base text-gray-100 font-pmedium mt-2">{selectedObject.genre}</Text>
            <Text className="text-base text-gray-100 font-pmedium mt-2">Niveau : {selectedObject.difficulty}</Text>

            <CustomButton 
                title="Afficher la partition écrite"
                handlePress={() => console.log('^^')}
                containerStyles="mt-5"
            
            />

            <ImageBackground
                source={{ uri: selectedObject.image }}
                style={styles.image}
                imageStyle={styles.imageBorderRadius}
                resizeMode='cover'
            />

            <View className='flex-row justify-between mt-7'>
                <CustomButton 
                    title="Mode Educatif"
                    containerStyles='w-[48%]'
                    handlePress={handleEducatifClick}
                />

                <CustomButton 
                    title="Mode Solo"
                    containerStyles='w-[48%]'
                    handlePress={handleSoloClick}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Play

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 224, 
        marginTop: 40 
    },
    imageBorderRadius: {
        borderRadius: 15
    }
})