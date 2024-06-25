import { View, Text, FlatList, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectInput from '../../components/SelectInput';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getPartitionsByGenre, getAllPartitions, getTrendingPartitions } from '../../lib/appwrite';
import PartitionCard from '../../components/PartitionCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const { user } = useGlobalContext();
  const [partitions, setPartitions] = useState([]);
  const [TrendingPartitions, setTrendingPartitions] = useState([])
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = [
    { label: 'Ambient', value: 'Ambient' },
    { label: 'Blues', value: 'Blues' },
    { label: 'Children', value: 'Children' },
    { label: 'Classical', value: 'Classical' },
    { label: 'Country', value: 'Country' },
    { label: 'Electronic', value: 'Electronic' },
    { label: 'Folk', value: 'Folk' },
    { label: 'Jazz', value: 'Jazz' },
    { label: 'Latin', value: 'Latin' },
    { label: 'Pop', value: 'Pop' },
    { label: 'Rap', value: 'Rap' },
    { label: 'Reggae', value: 'Reggae' },
    { label: 'Religious', value: 'Religious' },
    { label: 'Rock', value: 'Rock' },
    { label: 'Soul', value: 'Soul' },
    { label: 'Soundtracks', value: 'Soundtracks' },
    { label: 'Unknown', value: 'Unknown' },
    { label: 'World', value: 'World' },
  ];

  const loadPartitions = async (reset = false) => {
    try {
      const newPartitions = selectedGenre
        ? await getPartitionsByGenre(10, reset ? 0 : offset, selectedGenre)
        : await getAllPartitions(10, reset ? 0 : offset);
      if (reset) {
        setPartitions(newPartitions);
        setOffset(10);
      } else {
        setPartitions((prevPartitions) => [...prevPartitions, ...newPartitions]);
        setOffset((prevOffset) => prevOffset + 10);
      }
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de charger les partitions');
      console.log('err :', err);
    }
  };

  const loadTrendingPartitions = async () => {
    try {
      const trending = await getTrendingPartitions();
      setTrendingPartitions(trending);
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de charger les partitions tendances');
      console.log('err :', err);
    }
  };

  useEffect(() => {
    loadPartitions(true);
    loadTrendingPartitions()
  }, [selectedGenre]);

  const onRefresh = async () => {
    setRefreshing(true);
    setSelectedGenre("")
    await loadPartitions(true);
    await loadTrendingPartitions()
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    await loadPartitions(false);
    setLoadingMore(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
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
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-6">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Partitions du moment
              </Text>
              <Trending
                posts={TrendingPartitions ?? []}
              />
            </View>

            <SelectInput
                name="Genre :"
                items={genres}
                handleChange={(e) => setSelectedGenre(e)}
              />
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
        ListFooterComponent={() => (
          <View className="py-4">
            <TouchableOpacity onPress={loadMore} disabled={loadingMore}>
              <Text className="text-center text-blue-500">
                {loadingMore ? 'Chargement...' : 'Charger 10 morceaux de plus'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
