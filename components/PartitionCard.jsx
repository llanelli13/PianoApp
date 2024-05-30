import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { addBookmark, deletePartition } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
import ContextMenu from './ContextMenu';

const PartitionCard = ({ partition, canBeBookMarked }) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const niveau = [
    { title: "Debutant", color: "#2ce40e" },
    { title: "Intermediaire", color: "#dfc80b" },
    { title: "Difficile", color: "#f06626" },
    { title: "Extreme", color: "#bd3c00" }
  ];

  const customColor = () => {
    if (partition.difficulty === niveau[0].title) {
      return niveau[0].color;
    } else if (partition.difficulty === niveau[1].title) {
      return niveau[1].color;
    } else if (partition.difficulty === niveau[2].title) {
      return niveau[2].color;
    } else if (partition.difficulty === niveau[3].title) {
      return niveau[3].color;
    }
  };

  const handleDelete = async () => {
    try {
      await deletePartition(partition.$id);
      console.log("Partition deleted successfully");
    } catch (err) {
      console.error("Failed to delete partition:", err.message);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1 ">
          <View
            style={{
              backgroundColor: customColor(),
              width: 46,
              height: 46,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#666666'
            }}
          >
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {partition.title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {partition.artiste}
            </Text>
          </View>
        </View>
        <View className="pt-2 mr-1">
          {canBeBookMarked ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => addBookmark(user.$id, partition.$id)}
            >
              <Image
                source={icons.bookmark}
                className="h-5 w-5"
                resizeMode='contain'
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Image
                source={icons.menu}
                className="h-5 w-5"
                resizeMode='contain'
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {menuVisible && (
        <ContextMenu
          onDelete={handleDelete}
          onSave={() => console.log("ajouter")}
        />
      )}
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: partition.partition }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PartitionCard;
