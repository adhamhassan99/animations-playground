import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

type Props = {}
type SearchPayload = {
    total_results: number
    page: number
    per_page: number
    photos: Photo[]
}

type Photo = {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    avg_color: string
    src: {
        original: string
        large: string
        medium: string
        large2x: string
    }
    alt: string
}


const { width } = Dimensions.get('screen')
const _imageWidth = width * 0.7
const _imageHeight = _imageWidth * 1.76
const _spacing = 12
const uri = 'https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait'

const Photo = ({ item, index, scrollX }: { item: Photo, index: number, scrollX: SharedValue<number> }) => {

    const styles = useAnimatedStyle(() => {
        return ({
            flex: 1,
            transform: [{
                scale:
                    interpolate(scrollX.value, [index - 1, index, index + 1], [1.6, 1, 1.6])
            }, {
                rotate: `${interpolate(scrollX.value, [index - 1, index, index + 1], [15, 0, -15])}deg`
            }]
        })
    })
    return (
        <View style={{ width: _imageWidth, height: _imageHeight, overflow: 'hidden', borderRadius: 16 }}>
            <Animated.Image source={{ uri: item.src.large }} style={styles} />
        </View>
    )
}

const Backdrop = ({ photo, index, scrollX }: { photo: Photo, index: number, scrollX: SharedValue<number> }) => {
    const styles = useAnimatedStyle(() => {
        return ({
            opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0])
        })
    })
    return (
        <Animated.Image source={{ uri: photo.src.large }} style={[styles, StyleSheet.absoluteFillObject]} blurRadius={50} />
    )
}

const AnimatedBGCarousel = (props: Props) => {
    const { data, isLoading, isError } = useQuery<SearchPayload>({
        queryKey: ['wallpapers'],
        queryFn: async () => {
            const res = await fetch(uri, {
                headers: {
                    Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY as string
                }
            })
            return res.json()
        }
    })

    const scrollX = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / (_imageWidth + _spacing)
    })

    if (isLoading || isError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={StyleSheet.absoluteFillObject}>
                {data?.photos.map((Photo, index) => <Backdrop photo={Photo} index={index} scrollX={scrollX} />)}
            </View>
            <Animated.FlatList
                horizontal
                contentContainerStyle={{ gap: _spacing, paddingHorizontal: (width - _imageWidth) / 2 }}
                style={{ flexGrow: 0 }}
                snapToInterval={_imageWidth + _spacing}
                decelerationRate={'fast'}
                onScroll={onScroll}
                data={data.photos}
                keyExtractor={(item) => String(item.id)}
                scrollEventThrottle={1000 / 60}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => <Photo item={item} index={index} scrollX={scrollX} />}
            />
        </View>
    )
}

export default AnimatedBGCarousel

const styles = StyleSheet.create({})