import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPartitions, signOut } from '../../lib/appwrite'
import PartitionCard from '../../components/PartitionCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext()
  const { data: partitions, refetch} = useAppwrite(() => getUserPartitions(user.$id))
  const [refreshing, setRefreshing] = useState(false)

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLogged(false)

    router.replace("/sign-in");
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={partitions}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PartitionCard
            partition={item}
            printImage={true}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex items-center justify-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image 
                source={icons.logout} 
                className="w-6 h-6"
                resizeMode='contain'
              />
            </TouchableOpacity>


            <View
              className="w-16 h-16 border border-secondary rounded-lg justify-center items-center"
            >
              <Image 
                source={{uri : user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover'
              />
            </View>

            <InfoBox 
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />

              <View className="mt-5 flex flex-row">
                <InfoBox 
                  title={user?.Niveau}
                  subtitle="Niveau"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox 
                  title={user?.played}
                  subtitle="Jouées"
                  titleStyles="text-xl"
                />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            buttonTitle="Ajouter des partitions !" 
            title="Pas de partitions trouvées"
            subtitle="Vous n'avez pas de partitions, ajoutez en !"
            redirect='/create'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Profile