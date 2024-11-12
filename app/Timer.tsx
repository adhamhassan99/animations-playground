import { Animated, Dimensions, Easing, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, Vibration, View } from 'react-native'
import React from 'react'

type Props = {}
const { width, height } = Dimensions.get('window');

const colors = {
    black: '#323F4E',
    red: '#F76A6A',
    text: '#ffffff',
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;



const Timer = (props: Props) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const ref = React.useRef<TextInput>();
    const [duration, setDuration] = React.useState(timers[0]);
    const textAnimatedValue = React.useRef(new Animated.Value(height)).current;
    const timerValue = React.useRef(new Animated.Value(height)).current;

    React.useEffect(() => {
        // value => duration
        // height => x
        const listener = textAnimatedValue.addListener(({ value }) => {
            ref?.current?.setNativeProps({
                text: value < 0.1 ? '0' : Math.ceil(value).toString(),
            });
        });

        return () => {
            timerValue.removeListener(listener);
            timerValue.removeAllListeners();
        };
    }, []);
    console.log(animatedValue, duration)

    const animation = React.useCallback(() => {
        console.log(duration, animatedValue)
        textAnimatedValue.setValue(duration);
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(timerValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.linear,
            }),
            Animated.parallel([
                Animated.timing(timerValue, {
                    toValue: height,
                    duration: duration * 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(textAnimatedValue, {
                    toValue: 0,
                    duration: duration * 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
            ]),
            Animated.delay(100),
        ]).start(() => {
            Vibration.cancel();
            Vibration.vibrate();
            timerValue.setValue(height);
            textAnimatedValue.setValue(duration);
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        });
    }, [duration]);
    const buttonTranslateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });



    return (
        <View style={styles.container}>
            <StatusBar hidden />

            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        height,
                        width,
                        backgroundColor: colors.red,
                        transform: [
                            {
                                translateY: timerValue,
                            },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        transform: [
                            {
                                translateY: buttonTranslateY,
                            },
                        ],
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: 100,
                    },
                ]}>
                <TouchableOpacity onPress={animation}>
                    <View style={styles.roundButton} />
                </TouchableOpacity>
            </Animated.View>
            <View
                style={{
                    position: 'absolute',
                    top: height / 3,
                    left: 0,
                    right: 0,
                    flex: 1,
                }}>
                <Animated.View
                    style={{
                        opacity: animatedValue,
                        width: ITEM_SIZE,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        alignSelf: 'center',
                    }}>
                    <TextInput
                        ref={ref}
                        focusable={false}
                        editable={false}
                        style={styles.text}
                        defaultValue={duration.toString()}
                    />
                </Animated.View>
            </View>

            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={timers}
                keyExtractor={(item) => item.toString()}
                horizontal
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
                style={{ flexGrow: 0, opacity }}
                onMomentumScrollEnd={(e) => {
                    setDuration(
                        timers[Math.round(e.nativeEvent.contentOffset.x / ITEM_SIZE)]
                    );
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                bounces={false}

                renderItem={({ index, item }) => {
                    const inputRange = [
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE,
                    ];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.7, 1, 0.7],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <View style={{ width: ITEM_SIZE }}>
                            <Animated.Text style={[styles.text, {
                                textAlign: 'center',
                                opacity,
                                transform: [
                                    {
                                        perspective: ITEM_SIZE
                                    },
                                    {
                                        scale,
                                    }
                                ]
                            }]}>{item}</Animated.Text>
                        </View>

                    )
                }}
            />
        </View>
    )
}

export default Timer

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        flex: 1
    },
    text: {
        fontSize: ITEM_SIZE * 0.8,
        fontFamily: 'Menlo',
        color: colors.text,
        fontWeight: '900',
    },
    roundButton: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: colors.red,
    },
})