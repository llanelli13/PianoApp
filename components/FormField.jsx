import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <LinearGradient
                colors={['#0D4DB1', '#C56BE4']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.gradientBorder}
            >
                <View style={styles.innerContainer}>
                    <TextInput
                        className="flex-1 text-white font-psemibold text-base"
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7b7b8b"
                        onChangeText={handleChangeText}
                        secureTextEntry={title === 'Mot de passe' && !showPassword}
                    />
                    {title === 'Mot de passe' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                className="w-6 h-6"
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gradientBorder: {
        width: '100%',
        height: 64, // 16 * 4
        borderRadius: 16,
        padding: 2, // to give space for the gradient effect
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C2C2C',
        borderRadius: 14, // Slightly smaller radius to fit inside the gradient border
        paddingHorizontal: 16, // 4 * 4
    }
})

export default FormField
