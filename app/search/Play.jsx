import { Alert, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import io from 'socket.io-client';

const Play = () => {
    const { selectedObject } = useGlobalContext();
    const socket = io('http://192.168.1.91:8080');  // Assurez-vous de remplacer par l'IP correcte de votre serveur

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('file', (data) => {
            console.log('File received from server:', data);
            // Here you can handle the received file data
        });

        socket.on('error', (error) => {
            console.error('Error from server:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const afficherPartitionEcrite = () => {
        Alert.alert("Erreur", "Pas de partitions");
    };

    const envoyerMessage = (educatif) => {
        let message;
        if (!educatif) {
            console.log('solo')
            message = `${selectedObject.partition},S`;
        } else {
            console.log('educatif')
            message = `${selectedObject.partition},E`;
        }

        socket.emit('message', message);
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
                        handlePress={() => envoyerMessage(true)}
                    />

                    <CustomButton 
                        title="Mode Solo"
                        containerStyles='w-[48%]'
                        handlePress={() => envoyerMessage(false)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Play;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 224, 
        marginTop: 40 
    },
    imageBorderRadius: {
        borderRadius: 15
    }
});
