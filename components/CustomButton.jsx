import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (

      <TouchableOpacity
        className={`${containerStyles} ${isLoading ? "opacity-50" : ""}`}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <LinearGradient
            colors={['#0D4DB1', '#C56BE4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
                {title}
            </Text>
        </LinearGradient>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20
  },
});

export default CustomButton;
