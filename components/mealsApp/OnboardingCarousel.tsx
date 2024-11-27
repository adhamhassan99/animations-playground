import { Dimensions, FlatList, Image, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Onboarding1, Onboarding2, Onboarding3 } from '@/assets/images/AppImages'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { router } from 'expo-router'

type Props = {}
const carouselData = [{
    image: Onboarding1,
    title: 'Personalized meal planning',
    subtitle: `Pick your week's meals in minutes. With over 200 personalization options, eat exactly how you want to eat.`
}, {
    image: Onboarding2,
    title: 'Simple, stress-free grocery shopping',
    subtitle: `Grocery shop once per week with an organized "done for you" shopping list.`
}, {
    image: Onboarding3,
    title: 'Delicious, healthy meals made easy',
    subtitle: `Easily cook healthy, delicious meals in about 30 minutes, from start to finish.`
}]

const { width: SCREEN_WIDTH } = Dimensions.get('screen')

const OnboardingCarousel = (props: Props) => {
    const scrollX = useSharedValue(0)

    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / SCREEN_WIDTH
    })

    const renderItem: ListRenderItem<typeof carouselData[0]> | null | undefined = ({ index, item: { image, subtitle, title } }) => {
        return (
            <View className='w-screen gap-[90]'>
                <Image className='w-full px-5' resizeMode='contain' source={image} />

                <View className='gap-2 items-center px-12 text-pretty'>
                    <Text className='text-pretty text-3xl text-center font-semibold text-gray-900 tracking-tighter'>{title}</Text>
                    <Text className='text-pretty text-lg leading-6 text-center text-gray-600'>{subtitle}</Text>
                </View>
            </View>
        )
    }
    return (
        <View className='justify-between flex-1'>
            <Animated.FlatList
                // contentContainerClassName='w-full'
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment='center'
                horizontal
                data={carouselData}
                keyExtractor={(item) => item.title}
                renderItem={renderItem}


            />
            <View className='absolute top-[56%] items-center w-full flex-row gap-3 justify-center'>
                {carouselData.map((_, index) => {
                    const style = useAnimatedStyle(() => ({
                        backgroundColor: '#F58700',
                        height: '100%',
                        borderRadius: 10,
                        opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0], 'clamp'),
                        width: '100%'
                    }))
                    return (
                        <Animated.View style={{
                            width: 14,
                            height: 14,
                            backgroundColor: '#E6E6E6',
                            borderRadius: 10
                        }}>
                            <Animated.View style={style} />
                        </Animated.View>

                    )
                })}
            </View>
            <View className='px-5 gap-4'>
                <Pressable onPress={() => router.push('/selectDiet')} className='p-4 items-center rounded-2xl aria-pressed:bg-slate-400 bg-[#F58700]'
                // style={(state) => { return ({ backgroundColor: '#F58700', alignItems: 'center', borderRadius: 16, padding: 16 }) }}
                >
                    <Text className='text-lg font-bold'>Continue</Text>
                </Pressable>
                <Pressable className='items-center'>
                    <Text className='text-lg font-medium'>Skip</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default OnboardingCarousel

const styles = StyleSheet.create({})