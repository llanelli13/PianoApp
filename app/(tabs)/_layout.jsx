import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'
import { StatusBar } from 'expo-status-bar'


const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className='items-center justify-center gap-2'> 
            <Image 
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
        </View>
    )
}
const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#924df4",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84
                }
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon 
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen 
                name="create"
                options={{
                    title: "Ajouter",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon 
                            icon={icons.plus}
                            color={color}
                            name="Ajouter"
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profil",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon 
                            icon={icons.profile}
                            color={color}
                            name="Profil"
                            focused={focused}
                        />
                    )
                }}
            />  

            <Tabs.Screen 
                name="bookmark"
                options={{
                    title: "Favoris",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon 
                            icon={icons.bookmark}
                            color={color}
                            name="Favoris"
                            focused={focused}
                        />
                    )
                }}
            /> 
        </Tabs>

        <StatusBar 
        backgroundColor='black'
        style='light'
      />
    </>
  )
}

export default TabsLayout