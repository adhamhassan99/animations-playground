import { View, Pressable } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { router } from 'expo-router'



const NavHeader = () => {
    return (
        <View className='flex flex-row'>
            <Pressable onPress={() => router.back()}>
                <ArrowLeft color="black" size={24} />
            </Pressable>
        </View>
    )
}

export default NavHeader