import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavHeader from '@/components/mealsApp/NavHeader'
import AnimatedStepper from '@/components/mealsApp/AnimatedStepper'
import TogglePill from '@/components/mealsApp/TogglePill'
import { router } from 'expo-router'

type Props = {}

const pills = {
    'Classic': false,
    "Low Carb": false,
    "Keto": false,
    "Flexitarian": false,
    "Paleo": false,
    "Vegetarian": false,
    "Pescetarian": false,
    "Vegan": false
}

const selectDiet = (props: Props) => {
    const [step, setStep] = useState(1)
    const [pillsData, setPillsData] = useState(pills)
    const handlePress = (pill: keyof typeof pillsData) => {
        let newData = { ...pillsData }
        newData[pill] = !newData[pill]
        setPillsData(newData)
    }
    return (
        <View className='flex-1 bg-orange-50'>
            <SafeAreaView className='gap-4 px-4 flex-1'>
                <NavHeader />
                <AnimatedStepper totalSteps={5} activeStep={step} />
                <View className='gap-8'>
                    <Text className='font-bold text-[#1A1A1A] text-3xl pt-4'>Pick your diet</Text>
                    <View className='gap-4'>

                        {Array.from(Object.keys(pills)).map((pill: keyof typeof pillsData) => (

                            <TogglePill key={pill} label={pill} isSelected={pillsData[pill]} setIsSelected={() => handlePress(pill)} />
                        ))}
                    </View>
                </View>
                <Pressable onPress={() => router.push('/selectDiet')} className='p-4 items-center rounded-2xl mt-auto aria-pressed:bg-slate-400 bg-[#F58700]'
                // style={(state) => { return ({ backgroundColor: '#F58700', alignItems: 'center', borderRadius: 16, padding: 16 }) }}
                >
                    <Text className='text-lg font-bold'>Continue</Text>
                </Pressable>
            </SafeAreaView>
        </View>
    )
}

export default selectDiet

const styles = StyleSheet.create({})