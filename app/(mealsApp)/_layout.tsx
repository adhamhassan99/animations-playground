import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const _layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="selectDiet" />
        </Stack>
    )
}

export default _layout
