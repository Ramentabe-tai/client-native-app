import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { Chip, TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExpanseProps {
    onExpanseSubmitted: () => void
}
export default function Expanse({ onExpanseSubmitted }: ExpanseProps) {
    const [text, setText] = useState("");
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
            <Text>カテゴリ</Text>
            <View style={styles.iconChipContainer}>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="red" />)} style={styles.iconChip}>買い物</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="blue" />)} style={styles.iconChip}>衣類</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="green" />)} style={styles.iconChip}>ショッピング</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="orange" />)} style={styles.iconChip}>旅行</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="pink" />)} style={styles.iconChip}>外食</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="gray" />)} style={styles.iconChip}>健康</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="information" size={20} color="black" />)} style={styles.iconChip}>交通</Chip>

            </View>
            <Text>Memo</Text>
            <TextInput
                label="Memo"
                value={text}
                onChangeText={text => setText(text)}
                style={{ marginHorizontal: 10, width: 'auto' }}
            />
            <Button icon="mail" mode="contained" onPress={onExpanseSubmitted}
                style={{ marginTop: 20, marginHorizontal: 10 }}>
                出金
            </Button>
        </>
    );
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
    iconChipContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    iconChip: {
        margin: 3
    },


});
