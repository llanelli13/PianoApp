import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const {isLoading, isLogged } = useGlobalContext()

  if (!isLoading && isLogged ) return <Redirect href="/home" />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image 
            source={images.logo_n}
            className="w-[300px] h-[100px]"
            resizeMode='contain'
          />

          <View className="relative mt-12">
            <Text className="text-3xl text-white font-bold text-center">
              L'harmonie de la tradition, la puissance de l'IA
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Apprenez à jouer du piano, ou appréciez le piano jouer tout seul !
            </Text>

          <CustomButton
              title="Continuer avec Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-15"
           />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'>

      </StatusBar>
    </SafeAreaView>
  );
}

