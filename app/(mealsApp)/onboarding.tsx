import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import OnboardingCarousel from '@/components/mealsApp/OnboardingCarousel';
import NavHeader from '@/components/mealsApp/NavHeader';

type Props = {}

const Onboarding = (props: Props) => {
    return (
        <View className='flex-1'>
            <SafeAreaView className='flex-1'>
                <View className='px-4'>
                    <NavHeader />
                </View>
                <OnboardingCarousel />
            </SafeAreaView>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({})