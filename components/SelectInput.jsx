import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectInput = ({ items, otherStyles, handleChange }) => {
  const [selectedValue, setSelectedValue] = useState(items.length ? items[0].value : '');
  console.log("selectedValue :", selectedValue)

  return (
    <View className={`space-y-2 ${otherStyles}`}> 
    
    <Text className="text-base text-gray-100 font-pmedium">Difficulté</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <Picker
          selectedValue={selectedValue}
          //&& ((itemValue, itemIndex) => setSelectedValue(itemValue))
          onValueChange={handleChange }
          dropdownIconColor={"#ffffff"}
          style={{ color: '#7b7b8b',  width: '100%'}} 
          itemStyle={{ color: '#7b7b8b' }}
        >
          {items.map((item) => (
            <Picker.Item label={item.label} value={item.value} key={item.value}/>
          ))}
        </Picker>
      </View>
    </View>
  );

};

export default SelectInput;