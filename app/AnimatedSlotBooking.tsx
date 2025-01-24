import { Button, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeInDown, FadeInUp, FadeOutUp, LinearTransition } from 'react-native-reanimated'



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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const TimeSlot = ({ startHour, onRemove, index }: { startHour: number, onRemove: () => void, index: number }) => {
    return (
        <Animated.View entering={FadeInDown.delay(50 * (index))} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>From:</Text>
            <View style={{ justifyContent: 'center', flex: 1, borderWidth: 1, borderColor: 'grey', padding: 1, borderRadius: 5, marginHorizontal: 10 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>{startHour}</Text>
            </View>
            <Text>To:</Text>
            <View style={{ justifyContent: 'center', flex: 1, borderWidth: 1, borderColor: 'grey', padding: 1, borderRadius: 5, marginHorizontal: 10 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>{startHour + 1}</Text>
            </View>
            <Pressable hitSlop={15} onPress={onRemove}>
                <Text style={{ fontSize: 20 }}>x</Text>
            </Pressable>
        </Animated.View>
    )
}

const _layout = LinearTransition.springify().damping(14)
const Day = ({ day }: { day: string }) => {
    const [checked, setChecked] = useState(false);
    const [startHour, setStartHour] = useState([1])

    const handleRemoveSLot = (slot: number) => {
        if (startHour.length === 1) setStartHour([])

        else setStartHour((prev) => prev.filter((val) => val !== slot))
    }
    return (
        <Animated.View layout={_layout} style={styles.dayContainer}>
            <View className='flex items-center flex-row justify-between'>
                <Text>{day}</Text>
                <Switch value={checked} onValueChange={(val) => setChecked(val)} style={{ transform: [{ scale: 0.75 }], transformOrigin: ['100%', '50%', 0] }} trackColor={{ true: 'green' }} />
            </View>
            {checked && (
                <Animated.View style={{ gap: 10 }} entering={FadeInDown.delay(200)} >
                    {startHour.map((hour, index) => (
                        <TimeSlot index={index} onRemove={() => handleRemoveSLot(hour)} startHour={hour} />
                    ))}
                    <AnimatedPressable onPress={() => setStartHour((prev) => [...prev, (prev[prev.length - 1] ?? 0) + 1])} layout={_layout}>
                        <Text>add</Text>
                    </AnimatedPressable>

                </Animated.View>
            )
            }
        </Animated.View >
    )
}

const AnimatedSlotBooking = (props: Props) => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView bounces={false} contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}>
                {DAYS.map(day => (
                    <Day key={day} day={day} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AnimatedSlotBooking


const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    dayContainer: {
        borderWidth: 1,
        borderColor: '#9ca3af',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 8,
        borderRadius: 8,
        gap: 16
    }
})