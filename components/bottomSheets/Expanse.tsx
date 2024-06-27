import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { Chip, TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface ExpanseProps {
    onExpanseSubmitted: () => void
}
export default function Expanse({ onExpanseSubmitted }: ExpanseProps) {
    const [text, setText] = useState("");
    return (
        <>
            <View>
                <Text style={styles.moneyHeadline}>金額</Text>
                <Input
                    containerStyle={{ width: 'auto', height: "16%" }}
                    disabledInputStyle={{ backgroundColor: '#ddd' }}
                    inputContainerStyle={{ borderBottomWidth: 1, borderColor: "#F48E35", width: "auto" }}
                    inputStyle={{ textAlign: 'right', padding: 5 }}
                    rightIcon={<Icon name="close" size={20} />}
                    rightIconContainerStyle={{}}
                    placeholder="¥ 10,000"
                    placeholderTextColor={"#000"}
                />
            </View>

            <View style={styles.chipContainer}>
                <Chip onPress={() => console.log('3000 Pressed')} style={styles.chip}>3,000</Chip>
                <Chip onPress={() => console.log('5000 Pressed')} style={styles.chip}>5,000</Chip>
                <Chip onPress={() => console.log('7000 Pressed')} style={styles.chip}>7,000</Chip>
                <Chip onPress={() => console.log('10000 Pressed')} style={styles.chip}>10,000</Chip>
            </View>
            <Text style={styles.categoryHeadline}>カテゴリ</Text>
            <View style={styles.iconChipContainer}>
                <Chip icon={() => (<FontAwesome name="shopping-bag" size={20} color="red" />)} style={styles.iconChip}>買い物</Chip>
                <Chip icon={() => (<Ionicons name="shirt" size={20} color="blue" />)} style={styles.iconChip}>衣類</Chip>
                <Chip icon={() => (<MaterialCommunityIcons name="baguette" size={20} color="green" />)} style={styles.iconChip}>ショッピング</Chip>
                <Chip icon={() => (<FontAwesome name="suitcase" size={20} color="orange" />)} style={styles.iconChip}>旅行</Chip>
                <Chip icon={() => (<Ionicons name="restaurant" size={20} color="pink" />)} style={styles.iconChip}>外食</Chip>
                <Chip icon={() => (<MaterialIcons name="health-and-safety" size={20} color="gray" />)} style={styles.iconChip}>健康</Chip>
                <Chip icon={() => (<FontAwesome name="train" size={20} color="black" />)} style={styles.iconChip}>交通</Chip>

            </View>
            <Text style={styles.memoHeadline}>Memo</Text>
            <TextInput
                mode='outlined'
                value={text}
                onChangeText={text => setText(text)}
                activeOutlineColor='#F48E35'
                style={{ marginHorizontal: 10, width: 'auto', backgroundColor: "#FFF" }}
            />
            <Button mode="contained" onPress={onExpanseSubmitted}
                style={{ marginTop: 16, marginHorizontal: 10, backgroundColor: '#F48E35' }}>
                出金
            </Button>
        </>
    );
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
    categoryHeadline: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 8,
    },
    chip: {
        borderWidth: 1,
        borderColor: "#F48E35",
        backgroundColor: "#fff",
        marginHorizontal: 3,
    },
    iconChipContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        marginHorizontal: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    memoHeadline: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 8,
    },
    iconChip: {
        borderWidth: 1,
        borderColor: "#F48E35",
        backgroundColor: "#fff",
        margin: 3,
    },


});
