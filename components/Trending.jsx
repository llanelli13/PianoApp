import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { icons } from '../constants'
import MusicSheet from './MusicSheet'
import { useGlobalContext } from '../context/GlobalProvider'
import { useRouter } from 'expo-router';

const zoomIn = {
  0: {
    scale: 0.9
  }, 
  1: {
    scale: 1.05
  }
}

const zoomOut = {
  0: {
    scale: 1.05
  }, 
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({ activeItem, item }) => {

  const router = useRouter()
  const { setSelectedObject } = useGlobalContext()

  const renderPlayScreen = () => {
    setSelectedObject(item)
    router.push('/search/Play')
  }

  return (
    <Animatable.View
      className="mr-4"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={() => renderPlayScreen()}
      >
        <ImageBackground
          source={{ uri: item.image }}
          className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode='cover'
        />

        <Image 
          source={icons.play}
          className="h-12 w-12 absolute"
          resizeMode="contain"
        />

        <Text 
          className="text-white font-psemibold w-52 text-center mt-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {

  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending
