import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { searchPartitions } from '../../lib/appwrite'
import PartitionCard from '../../components/PartitionCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: partitions, refetch } = useAppwrite(() => searchPartitions(query))

  console.log(query, partitions)

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={partitions}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PartitionCard
            partition={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Résultats de la recherche
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>
            
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} refetch={refetch}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="Pas de partitions trouvées"
            subtitle="Pas de partitions trouvées pour votre recherche"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search