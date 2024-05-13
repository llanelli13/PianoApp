import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as documentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createPartition } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import SelectInput from '../../components/SelectInput'

const Create = () => {

  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    partition: null,
    artiste: "",
    difficulte: ""
  })

  const difficulties = [
    { label: 'Debutant', value: 'Debutant' },
    { label: 'Intermediaire', value: 'Intermediaire' },
    { label: 'Difficile', value: 'Difficile' },
    { label: 'Extrême', value: 'Extreme'}
  ];

  const openPicker = async (selectType) => {
    const result = await documentPicker.getDocumentAsync({
      type: selectType === "partition" ? ['audio/midi', 'audio/x-midi', 'audio/mid'] : '*/*',
    })

    if (!result.canceled) {
      console.log('asset :', result.assets[0])
      setForm({...form, partition: result.assets[0]})
    }
  }

  const submit = async () => {
    console.log("titre :", form.title, "\npartition :", form.partition, "\nartiste :", form.artiste, "\ndifficulte :", form.difficulte)
    if (form.artiste === "" || form.difficulte === "" || !form.partition || form.title === "") {
      return Alert.alert("Veuillez renseigner l'ensemble des champs")
    }

    setUploading(true)
    try {
      await createPartition(form)

      Alert.alert("Succès", "Partition enregistrée avec succès !")
      router.push('/home')
    } catch (err) {
      Alert.alert('Erreur', err.message)
      console.log("message:", err.message)
    } finally {
      setForm({
        title: "",
        partition: null,
        artiste: "",
        difficulte: ""
      })

      setUploading(false)
    }
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemi-bold">
          Importer une partition
        </Text>

        <FormField 
          title="Titre de la musique"
          value={form.title}
          placeholder="Titre de la musique ..."
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Importer la partition
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('partition')}
          >
            {form.partition ? (
              <View>
                <Text className="text-white">
                  Je suis la partition
                </Text>

              </View>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image 
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode='contain'
                  />
                </View>

              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-3 space-y-2">
          <FormField 
            title="Artiste"
            value={form.artiste}
            placeholder="Nom de l'artiste ..."
            handleChangeText={(e) => setForm({...form, artiste: e})}
            otherStyles="mt-2"
          />
          
          <SelectInput 
            items={difficulties}
            handleChange={(e) => setForm({...form, difficulte: e})}
            otherStyles="mt-3"
          />
        </View>

        <CustomButton 
          title="Importer"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create