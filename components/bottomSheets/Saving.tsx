
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Input, Icon } from '@rneui/themed';
import { Chip, Button } from 'react-native-paper';

interface SavingProps {
    onSavingSubmitted: () => void

}

export default function Saving({ onSavingSubmitted }: SavingProps) {
    return (
        <>
            <View>
                <Text style={styles.moneyHeadline}>金額</Text>
                <Input
                    containerStyle={{ width: 'auto' }}
                    disabledInputStyle={{ backgroundColor: '#ddd' }}
                    inputContainerStyle={{ borderBottomWidth: 1, borderColor: "#F48E35", width: "auto"}}
                    inputStyle={{ textAlign: 'right', padding: 5 }}
                    rightIcon={<Icon name="close" size={20} />}
                    rightIconContainerStyle={{}}
                    placeholder="¥ 10,000 "
                    placeholderTextColor={"#000"}
                />
            </View>
            <View style={styles.chipContainer}>
                <Chip onPress={() => console.log('3000 Pressed')} style={styles.chip}>3,000</Chip>
                <Chip onPress={() => console.log('5000 Pressed')} style={styles.chip}>5,000</Chip>
                <Chip onPress={() => console.log('7000 Pressed')} style={styles.chip}>7,000</Chip>
                <Chip onPress={() => console.log('10000 Pressed')} style={styles.chip}>10,000</Chip>
            </View>

            <Button icon="mail" mode="contained" onPress={onSavingSubmitted}
                style={{ marginTop: 20, marginHorizontal: 10 }}>
                入金
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    moneyHeadline: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#F48E35",
        marginLeft: 16,
    },
    chipContainer: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    chip: {
        backgroundColor: "#F0F1DF",
        marginHorizontal: 3,
    },
});
