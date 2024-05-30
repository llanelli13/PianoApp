import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


const ContextMenu = ({ onDelete, onSave, options }) => {

  return (
    <View className="absolute w-[95] top-2 right-10 bg-[#1E1E2D] p-2 rounded-lg shadow-lg shadow-black/20">
      <TouchableOpacity
         onPress={onDelete} 
      >
        <Text className="text-white font-pmedium text-sm">Supprimer</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onSave} 
        className="mt-4"
      >
        <Text className="text-white font-pmedium text-sm">Favoris</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ContextMenu
