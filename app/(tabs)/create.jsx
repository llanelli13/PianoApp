// import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import FormField from '../../components/FormField'
// import { icons } from '../../constants'
// import CustomButton from '../../components/CustomButton'
// import * as documentPicker from 'expo-document-picker'
// import { router } from 'expo-router'
// import { createPartition } from '../../lib/appwrite'
// import { useGlobalContext } from '../../context/GlobalProvider'
// import SelectInput from '../../components/SelectInput'

// const Create = () => {

//   const { user } = useGlobalContext()
//   const [uploading, setUploading] = useState(false)
//   const [form, setForm] = useState({
//     title: "",
//     partition: null,
//     artiste: "",
//     difficulte: "",
//     partition_texte: null
//   })

//   const difficulties = [
//     { label: 'Debutant', value: 'Debutant' },
//     { label: 'Intermediaire', value: 'Intermediaire' },
//     { label: 'Difficile', value: 'Difficile' },
//     { label: 'Extrême', value: 'Extreme'}
//   ];

//   const openPicker = async (selectType) => {
//     const result = await documentPicker.getDocumentAsync({
//       type: selectType === "partition" ? ['audio/midi', 'audio/x-midi', 'audio/mid'] : '*/*',
//     })

//     if (!result.canceled) {
//       setForm({...form, partition: result.assets[0]})
//     }
//   }

//   const submit = async () => {
//     if (form.artiste === "" || form.difficulte === "" || !form.partition || form.title === "") {
//       return Alert.alert("Veuillez renseigner l'ensemble des champs")
//     }

//     setUploading(true)
//     try {
//       await createPartition(form, user.$id)

//       Alert.alert("Succès", "Partition enregistrée avec succès !")
//       router.push('/home')
//     } catch (err) {
//       Alert.alert('Erreur', err.message)
//       console.log("message:", err.message)
//     } finally {
//       setForm({
//         title: "",
//         partition: null,
//         artiste: "",
//         difficulte: ""
//       })

//       setUploading(false)
//     }
//   }


//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView className="px-4 my-6">
//         <Text className="text-white text-2xl font-psemi-bold">
//           Importer une partition
//         </Text>

//         <FormField 
//           title="Titre de la musique"
//           value={form.title}
//           placeholder="Titre de la musique ..."
//           handleChangeText={(e) => setForm({...form, title: e})}
//           otherStyles="mt-10"
//         />

//         <View className="mt-7 space-y-2">
//           <Text className="text-base text-gray-100 font-pmedium">
//             Importer le fichier MIDI
//           </Text>

//           <TouchableOpacity
//             onPress={() => openPicker('partition')}
//           >
//             {form.partition ? (
//               <View>
//                 <Text className="text-white">
//                   Je suis la partition
//                 </Text>

//               </View>
//             ) : (
//               <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
//                 <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
//                   <Image 
//                     source={icons.upload}
//                     className="w-1/2 h-1/2"
//                     resizeMode='contain'
//                   />
//                 </View>

//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//         <View className="mt-3 space-y-2">
//           <FormField 
//             title="Artiste"
//             value={form.artiste}
//             placeholder="Nom de l'artiste ..."
//             handleChangeText={(e) => setForm({...form, artiste: e})}
//             otherStyles="mt-2"
//           />
          
//           <SelectInput 
//             items={difficulties}
//             handleChange={(e) => setForm({...form, difficulte: e})}
//             otherStyles="mt-3"
//           />
//         </View>

//         <CustomButton 
//           title="Importer"
//           handlePress={submit}
//           containerStyles="mt-7"
//           isLoading={uploading}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default Create


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
    difficulte: "",
    partition_texte: null,
    image: null
  })

  const difficulties = [
    { label: 'Debutant', value: 'Debutant' },
    { label: 'Intermediaire', value: 'Intermediaire' },
    { label: 'Difficile', value: 'Difficile' },
    { label: 'Extrême', value: 'Extreme'}
  ];

  const openPicker = async (selectType) => {
    let type;
    switch(selectType) {
      case 'partition':
        type = ['audio/midi', 'audio/x-midi', 'audio/mid'];
        break;
      case 'partition_texte':
        type = "application/pdf";
        break;
      case 'image':
        type = ['image/jpeg', 'image/png'];
        break;
      default:
        type = '*/*';
    }

    const result = await documentPicker.getDocumentAsync({ type })

    if (!result.canceled) {
      setForm({...form, [selectType]: result.assets[0]})
    }
  }

  const submit = async () => {
    if (form.artiste === "" || form.difficulte === "" || !form.partition || !form.partition_texte || !form.image || form.title === "") {
      return Alert.alert("Veuillez renseigner l'ensemble des champs et importer tous les fichiers")
    }

    setUploading(true)
    try {
      await createPartition(form, user.$id)

      console.log('Partition créée avec succès !')
      router.push('/home')
    } catch (err) {
      Alert.alert('Erreur', err.message)
      console.log("message:", err.message)
    } finally {
      setForm({
        title: "",
        partition: null,
        pdf: null,
        image: null,
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
            Importer le fichier MIDI
          </Text>
          <TouchableOpacity onPress={() => openPicker('partition')}>
            {form.partition ? (
              <Text className="text-white">{form.partition.name}</Text>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Importer la partition (format PDF)
          </Text>
          <TouchableOpacity onPress={() => openPicker('partition_texte')}>
            {form.partition_texte ? (
              <Text className="text-white">{form.partition_texte.name}</Text>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Importer une image (JPG ou PNG)
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.image ? (
              <Image 
                source={{ uri: form.image.uri }} 
                style={{ width: '100%', height: 200, borderRadius: 15 }} 
                resizeMode="contain"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
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
