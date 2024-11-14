import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EcommerceCarousel from '@/components/EcommerceCarousel'

type Props = {}

const EcommerceHomePage = (props: Props) => {
    return (
        <View style={{ flex: 1 }}>

            <EcommerceCarousel />

        </View>

    )
}

export default EcommerceHomePage

const styles = StyleSheet.create({})