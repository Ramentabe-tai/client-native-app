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
                <Text>金額</Text>
                <Input
                    containerStyle={{ width: 'auto' }}
                    disabledInputStyle={{ backgroundColor: '#ddd' }}
                    inputContainerStyle={{}}
                    inputStyle={{ textAlign: 'right', padding: 5 }}
                    rightIcon={<Icon name="close" size={20} />}
                    rightIconContainerStyle={{}}
                    placeholder="¥ 10,000 "
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
    chipContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    chip: {
        marginHorizontal: 3,
    },
});
