import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Chip, TextInput, Button } from 'react-native-paper';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Input, Icon } from '@rneui/themed';

interface Category {
    category_id: number;
    category_name: string;
}

interface ExpanseProps {
    onExpanseSubmitted: (amount: number) => void;
}

export default function Expanse({ onExpanseSubmitted }: ExpanseProps) {
    const [amount, setAmount] = useState<number | null>(null);
    const [memo, setMemo] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/categories');
            if (response.ok) {
                const categoriesData: Category[] = await response.json();
                setCategories(categoriesData);
            } else {
                console.error('Failed to fetch categories:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryPress = (categoryName: string) => {
        const selectedCategory = categories.find(cat => cat.category_name === categoryName);
        if (selectedCategory) {
            setSelectedCategoryId(selectedCategory.category_id);
        }
    };

    const handleChipPress = (chipAmount: number) => {
        setAmount(chipAmount);
    };

    const handleSubmit = async () => {
        if (amount !== null && selectedCategoryId !== null) {
            try {
                const postData = {
                    amount: amount,
                    memo: memo,
                    categoryId: selectedCategoryId,
                    memberId: 1 //const for now
                };
                console.log(postData)
                const response = await fetch('http://10.0.2.2:3000/api/accounts/1/expense', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Response:', responseData);
                    // Notify parent component that the expense has been submitted
                    onExpanseSubmitted(amount);
                } else {
                    console.error('Error:', response);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Incomplete data, cannot submit');
        }
    };

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
                    onChangeText={(value) => setAmount(Number(value))}
                    value={amount?.toString() || ''}
                />
            </View>

            <View style={styles.chipContainer}>
                <Chip onPress={() => handleChipPress(3000)} style={styles.chip}>3,000</Chip>
                <Chip onPress={() => handleChipPress(5000)} style={styles.chip}>5,000</Chip>
                <Chip onPress={() => handleChipPress(7000)} style={styles.chip}>7,000</Chip>
                <Chip onPress={() => handleChipPress(10000)} style={styles.chip}>10,000</Chip>
            </View>

            <Text style={styles.categoryHeadline}>カテゴリ</Text>
            <View style={styles.iconChipContainer}>
                {categories.map((category) => (
                    <Chip
                        key={category.category_id}
                        onPress={() => handleCategoryPress(category.category_name)}
                        style={[styles.iconChip, selectedCategoryId === category.category_id && styles.selectedChip]}
                    >
                        {category.category_name}
                    </Chip>
                ))}
            </View>

            <Text style={styles.memoHeadline}>Memo</Text>
            <TextInput
                mode='outlined'
                value={memo}
                onChangeText={text => setMemo(text)}
                activeOutlineColor='#F48E35'
                style={{ marginHorizontal: 10, width: 'auto', backgroundColor: "#FFF" }}
            />

            <Button mode="contained" onPress={handleSubmit}
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
    categoryHeadline: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 8,
    },
    chipContainer: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginBottom: 16,
        alignItems: 'center',
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
    selectedChip: {
        backgroundColor: "#F48E35",
    },
    chip: {
        borderWidth: 1,
        borderColor: "#F48E35",
        backgroundColor: "#fff",
        marginHorizontal: 3,
        marginBottom: 8,
    },
});
