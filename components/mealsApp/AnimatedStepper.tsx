import React from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

type Props = {
    activeStep: number
    totalSteps: number
}

const AnimatedStepper = ({ activeStep, totalSteps }: Props) => {

    return (
        <View className='flex flex-row gap-2 w-full h-3'>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const styles = useAnimatedStyle(() => ({
                    width: index === activeStep - 1 ? withSpring('100%', { damping: 200, stiffness: 80 }) : index < activeStep - 1 ? '100%' : '0%'

                }))
                return (
                    <View className='flex-1 bg-[#E6E6E6] rounded-full overflow-hidden flex-row'>
                        <Animated.View entering={FadeIn} style={[{ backgroundColor: '#33995B' }, styles]} />
                    </View>
                )
            })}
        </View>
    )
}

export default AnimatedStepper