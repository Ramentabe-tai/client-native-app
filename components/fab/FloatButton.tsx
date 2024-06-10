import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Octicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DURATION = 400;
const TRANSLATE_Y = -70; // Define the consistent translation distance

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FloatButtonProps = {
    onOpenSavingAction: () => void;
    onOpenExpanseAction: () => void;
    setIsOpened: (isOpen: boolean) => void;
    isOpened: boolean;
};

export default function FloatButton({ onOpenSavingAction, onOpenExpanseAction, setIsOpened, isOpened }: FloatButtonProps) {
    const transYChart = useSharedValue(0);
    const transYSecondButton = useSharedValue(0);

    const handlePress = () => {
        setIsOpened(!isOpened); // Toggle isOpen state on press
    };

    useEffect(() => {
        if (isOpened) {
            transYChart.value = withTiming(TRANSLATE_Y, { duration: DURATION });
            transYSecondButton.value = withTiming(TRANSLATE_Y * 2, { duration: DURATION }); // Ensure equal spacing
        } else {
            transYChart.value = withTiming(0, { duration: DURATION });
            transYSecondButton.value = withTiming(0, { duration: DURATION });
        }
    }, [isOpened]);

    const rChartAnimateStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: transYChart.value }],
        };
    }, []);

    const rSecondButtonAnimateStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: transYSecondButton.value }],
        };
    }, []);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => pressed ? [styles.plusButton, { transform: [{ scale: 0.9 }] }] : [styles.plusButton]}>
                <Octicons name="plus" size={36} color="white" />
            </Pressable>
            <AnimatedPressable
                onPress={() => {
                    setIsOpened(false);
                    onOpenSavingAction();
                }} // Open the saving action when chart button is pressed
                style={[styles.chartButton, rChartAnimateStyles, { zIndex: isOpened ? 1 : -1 }]}
            >
                <MaterialIcons name="add-chart" size={32} color="white" />
            </AnimatedPressable>
            <AnimatedPressable
                onPress={() => {
                    setIsOpened(false);
                    onOpenExpanseAction();
                }} // Open the expanse action when the second button is pressed
                style={[styles.secondButton, rSecondButtonAnimateStyles, { zIndex: isOpened ? 1 : -1 }]}
            >
                <FontAwesome name="bar-chart" size={28} color="white" />
            </AnimatedPressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1, // Ensure container has a zIndex
    },
    plusButton: {
        width: 60,
        height: 60,
        backgroundColor: '#777',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    chartButton: {
        width: 48,
        height: 48,
        backgroundColor: '#777',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 6,
    },
    secondButton: {
        width: 48,
        height: 48,
        backgroundColor: '#777',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 6,
    },
});
