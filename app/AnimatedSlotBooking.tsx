import { Button, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeInDown, FadeInUp, LinearTransition } from 'react-native-reanimated'

type Props = {}
const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const _layout = LinearTransition.springify().damping(14)
const Day = ({ day }: { day: string }) => {
    const [checked, setChecked] = useState(false);
    const [startHour, setStartHour] = useState([1])
    return (
        <View className='border-gray-400 border my-2 mx-4 p-2 rounded-lg'>
            <View className='flex items-center flex-row justify-between'>
                <Text>{day}</Text>
                <Switch value={checked} onValueChange={(val) => setChecked(val)} style={{ transform: [{ scale: 0.75 }], transformOrigin: ['100%', '50%', 0] }} trackColor={{ true: 'green' }} />
            </View>
            {checked && (
                <View >
                    {startHour.map(hour => (
                        <Animated.View entering={FadeInDown} >
                            <Text>from, {hour}</Text>
                            <Text>to, {hour + 1}</Text>
                        </Animated.View>
                    ))}
                    <Button onPress={() => setStartHour((prev) => [...prev, prev[prev.length - 1] + 1])} title='add slot' />
                </View>
            )
            }
        </View >
    )
}

const AnimatedSlotBooking = (props: Props) => {
    return (
        <SafeAreaView className='flex-1 justify-center'>

            <Animated.View layout={_layout}>

                {DAYS.map(day => (
                    <Day key={day} day={day} />
                ))}
            </Animated.View>
        </SafeAreaView>
    )
}

export default AnimatedSlotBooking
