import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const SelectInput = ({ items, otherStyles, handleChange }) => {
  const [selectedValue, setSelectedValue] = useState(items.length ? items[0].value : '');
  console.log("selectedValue :", selectedValue)

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    handleChange(itemValue);
  }

  return (
    <View className={`space-y-2 ${otherStyles}`}> 
      <Text className="text-base text-gray-100 font-pmedium">Difficulté</Text>
      <LinearGradient
        colors={['#0D4DB1', '#C56BE4']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientBorder}
      >
        <View style={styles.innerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            dropdownIconColor={"#ffffff"}
            style={{ color: '#7b7b8b',  width: '100%'}} 
            itemStyle={{ color: '#7b7b8b' }}
          >
            {items.map((item) => (
              <Picker.Item label={item.label} value={item.value} key={item.value}/>
            ))}
          </Picker>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16, // Add some margin at the bottom for spacing
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'pmedium',
    marginBottom: 8,
  },
  gradientBorder: {
    borderRadius: 16,
    padding: 2,
  },
  innerContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 14,
    paddingHorizontal: 8,
    height: 64,
    justifyContent: 'center',
  },
});

export default SelectInput;
