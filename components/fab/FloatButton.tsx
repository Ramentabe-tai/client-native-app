import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Octicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DURATION = 400;
const TRANSLATE_Y = -80;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FloatButtonProps = {
    onOpenBottomSheet: () => void;
    onOpenSecondAction: () => void;
};

export default function FloatButton({ onOpenBottomSheet, onOpenSecondAction }: FloatButtonProps) {
    const [isOpened, setIsOpened] = useState(false);
    const transYChart = useSharedValue(0);
    const transYSecondButton = useSharedValue(0);

    const handlePress = () => {
        setIsOpened(!isOpened); // Toggle isOpen state on press
    };

    useEffect(() => {
        if (isOpened) {
            transYChart.value = withTiming(TRANSLATE_Y, { duration: DURATION });
            transYSecondButton.value = withTiming(TRANSLATE_Y * 1.8, { duration: DURATION });
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
                onPress={onOpenBottomSheet} // Open the bottom sheet when chart button is pressed
                style={[styles.chartButton, rChartAnimateStyles, { zIndex: isOpened ? 1 : -1 }]}
            >
                <MaterialIcons name="add-chart" size={32} color="white" />
            </AnimatedPressable>
            <AnimatedPressable
                onPress={onOpenSecondAction} // Open the second action when the second button is pressed
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
        zIndex: 1,
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
        backgroundColor: '#777',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
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
        right: 10,
    },
});
