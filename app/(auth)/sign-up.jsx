import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const signUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    if(form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Veuillez renseigner tous les champs')
    }

    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.username)
      router.replace('/home')

    } catch (err) {
      Alert.alert('Error', err.message)

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="items-center">
            <Image 
              source={images.logo_n}
              resizeMode='contain'
              className="w-[300px] h-[100px]"
            />
          </View>
          <View className='mt-7'>
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold"> 
              Inscription
            </Text>

            <FormField 
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({...form, username: e})}
              otherStyles="mt-10"
            />

            <FormField 
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            
            <FormField 
              title="Mot de passe"
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles="mt-7"
            />

            <CustomButton
              title="S'inscrire"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Déjà un compte ?
              </Text>
              <Link 
                href="/sign-in" 
                className='text-lg font-semibold text-secondary'>
                Se connecter
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signUp;