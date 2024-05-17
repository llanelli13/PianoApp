import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPartitions, getLatestPartitions } from '../../lib/appwrite'
import PartitionCard from '../../components/PartitionCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {

  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: partitions, refetch } = useAppwrite(getAllPartitions)
  // const { data: lastestPartitions } = useAppwrite(getLatestPartitions)

  const [refreshing, setRefreshing] = useState(false)

 
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={partitions}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PartitionCard
            partition={item}
            canBeBookMarked={true}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between item-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bon retour, 
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username} !
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3 ">
                Partitions du moment 
              </Text>

              <Trending
                posts={partitions ?? []}
              />

            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            buttonTitle="Créer votre partition !"
            title="Pas de partitions trouvées"
            subtitle="Ajoutez votre partition !"
            redirect="/create"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home