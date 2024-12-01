import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    isSelected: boolean
    setIsSelected: (flag: boolean) => void
    label: string
}

const TogglePill = ({ isSelected, setIsSelected, label }: Props) => {

    return (
        <Pressable onPress={setIsSelected} >

            <View className={`${isSelected ? 'bg-[#FFE4C2] border-[#F58700]' : 'bg-white border-[#CCCCCC]'} border px-6 py-4 rounded-2xl`}>
                <Text className='text-lg leading-6 font-bold text-[#1A1A1A]'>{label}</Text>
            </View>

        </Pressable>
    )
}

export default TogglePill

const styles = StyleSheet.create({})