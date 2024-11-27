import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavHeader from '@/components/mealsApp/NavHeader'
import AnimatedStepper from '@/components/mealsApp/AnimatedStepper'

type Props = {}

const selectDiet = (props: Props) => {
    const [step, setStep] = useState(1)
    return (
        <View className='flex-1 bg-white'>
            <SafeAreaView className='gap-4 px-4'>
                <NavHeader />
                <AnimatedStepper totalSteps={5} activeStep={step} />
                <Button title='inc' onPress={() => setStep(prev => prev + 1)}></Button>
                <Button title='dec' onPress={() => setStep(prev => prev - 1)}></Button>
            </SafeAreaView>
        </View>
    )
}

export default selectDiet

const styles = StyleSheet.create({})