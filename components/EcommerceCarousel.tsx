import { ISearchPayload } from '@/types/pexels'
import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import Animated, { interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

type Props = {}
const uri = `https://api.pexels.com/v1/curated?per_page=5`
const { width: SCREEN_WIDTH } = Dimensions.get('screen')

const EcommerceCarousel = (props: Props) => {
    const scrollX = useSharedValue(0)
    const ref = useRef<FlatList>(null)
    const { data, isLoading, isError } = useQuery<ISearchPayload>({
        queryKey: ['curated'],
        queryFn: async () => {
            const res = await fetch(uri, {
                headers: {
                    Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY as string
                }
            })
            return res.json()
        }
    })

    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / SCREEN_WIDTH
    })

    if (isLoading) {
        return (
            <ActivityIndicator />
        )
    }



    return (
        <View style={{ flex: 0.6 }}>

            <Animated.FlatList
                ref={ref}
                bounces={false}
                horizontal
                pagingEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                // style={{ flex: 1 }}
                // contentContainerStyle={{ flex: 1 }}
                onScroll={handleScroll}
                data={data?.photos}
                renderItem={({ item, index }) => (
                    <View style={{ width: SCREEN_WIDTH, overflow: 'hidden' }} key={item.id}>
                        <Image resizeMode='cover' style={{ height: '100%' }} source={{ uri: item.src.large }} />
                    </View>
                )}

            />
            <SafeAreaView style={{ position: 'absolute', bottom: 30, width: '100%', justifyContent: 'center', flexDirection: 'row', gap: 10, zIndex: 100 }}>
                {Array.from({ length: data?.photos.length ?? 0 }).map((_, index) => {
                    const styles = useAnimatedStyle(() => ({
                        width: interpolate(scrollX.value, [index - 1, index, index + 1], [10, 40, 10], 'clamp'),
                        backgroundColor: interpolateColor(scrollX.value, [index - 1, index, index + 1], ['darkgrey', 'white', 'darkgrey']),
                    }))
                    return (
                        <Pressable style={{ zIndex: 100 }} onPress={() => ref.current?.scrollToIndex({ index: index, animated: true })}>

                            <Animated.View style={[{ height: 10, borderRadius: 10 }, styles]} />
                        </Pressable>

                    )
                })}
            </SafeAreaView>
        </View >
    )
}

export default EcommerceCarousel