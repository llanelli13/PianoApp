import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getBookMarkedPartitions } from '../../lib/appwrite'
import PartitionCard from '../../components/PartitionCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Bookmark = () => {
  
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: partitions, refetch } = useAppwrite(() => getBookMarkedPartitions(user.$id))

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold mb-5">Vos favoris</Text>
      
      <FlatList
        data={partitions}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PartitionCard
            partition={item}
            canBeBookMarked={false}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 space-y-6">

            <SearchInput />

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            buttonTitle="Ajouter des favoris"
            title="Pas de partitions trouvées"
            subtitle="Ajouter des favoris !"
            redirect='/home'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

    </SafeAreaView>
  )
}

export default Bookmark