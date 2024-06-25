import { Alert, ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import CustomButton from '../../components/CustomButton'

const Play = () => {

    const { selectedObject } = useGlobalContext()

    const afficherPartitionEcrite = () => {
        Alert.alert("Erreur", "Pas de partitions")
    }

    const envoiTCP = (educatif) => {
        if (!educatif) {
            Alert.alert('Mode', 'SOLO')
            // Logique envoi TCP mode SOLO
        } else {
            Alert.alert("Mode", "Educatif")
            // Logique envoi TCP mode EDUCATIF
        }

    }
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView className="px-4 my-6">
            <Text className="text-white text-3xl font-psemi-bold mt-5">{selectedObject.title}</Text>
            <Text className="text-2xl text-gray-100 font-pregular mt-2">De {selectedObject.artiste}</Text>
            <Text className="text-base text-gray-100 font-pmedium mt-2">{selectedObject.genre}</Text>
            <Text className="text-base text-gray-100 font-pmedium mt-2">Niveau : {selectedObject.difficulty}</Text>

            <CustomButton 
                title="Afficher la partition écrite"
                handlePress={() => afficherPartitionEcrite()}
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
                    handlePress={() => envoiTCP(true)}
                />

                <CustomButton 
                    title="Mode Solo"
                    containerStyles='w-[48%]'
                    handlePress={() => envoiTCP(false)}
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
        height: 224, // Equivalent to h-56 in Tailwind (56 * 4 = 224)
        marginTop: 40 // Equivalent to mt-10 in Tailwind (10 * 4 = 40)
    },
    imageBorderRadius: {
        borderRadius: 15 // Adjust this value to control the roundness
    }
})