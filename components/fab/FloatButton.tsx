import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DURATION = 400;
const TRANSLATE_Y = -80;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FloatButton() {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const transYChart = useSharedValue(0);

    const handlePress = () => {
        setIsOpened(!isOpened); // Toggle isOpen state on press
    };

    useEffect(() => {
        if (isOpened) {
            transYChart.value = withTiming(TRANSLATE_Y, { duration: DURATION });
        } else {
            transYChart.value = withTiming(0, { duration: DURATION });
        }
    }, [isOpened]); // Update animation on isOpened change

    const rChartAnimateStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: transYChart.value }],
        };
    }, []);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => pressed ? [styles.plusButton, { transform: [{ scale: 0.9 }] }] : [styles.plusButton]}>
                <Octicons name="plus" size={36} color="white" />
            </Pressable>
            <AnimatedPressable style={[styles.chartButton, rChartAnimateStyles]}>
                <MaterialIcons name="add-chart" size={32} color="white" />
            </AnimatedPressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 5,
    },
    plusButton: {
        width: 60,
        height: 60,
        backgroundColor: '#777',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartButton: {
        width: 48,
        height: 48,
        backgroundColor: '#7777',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: -1,
        bottom: 10,
        right: 10,

    },
});
