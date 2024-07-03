import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Chip, TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Input, Icon } from '@rneui/themed';

interface Category {
    categoryId: number;
    categoryName: string;
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
            const response = await fetch('http://15.168.108.6:8080/api/categories');
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
        const selectedCategory = categories.find(cat => cat.categoryName === categoryName);
        if (selectedCategory) {
            setSelectedCategoryId(selectedCategory.categoryId);
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
                };

                const response = await fetch('http://15.168.108.6:8080/api/accounts/1/expense', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJqb25nd29uMzM0MEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTcyMDAwODM5MSwiZXhwIjoxNzIwMDQ0MzkxfQ.KkxfUN1FEyZK9czPMNONaTStLxIr-WilKQMEOYNGFYg', // Replace with your actual token
                    },
                    body: JSON.stringify(postData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Response:', responseData);
                    // Notify parent component that the expense has been submitted
                    onExpanseSubmitted(amount);
                } else {
                    console.error('Error:', response.statusText);
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
                        key={category.categoryId}
                        onPress={() => handleCategoryPress(category.categoryName)}
                        style={[styles.iconChip, selectedCategoryId === category.categoryId && styles.selectedChip]}
                    >
                        {category.categoryName}
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

const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
        case "買い物":
            return () => (<FontAwesome name="shopping-bag" size={20} color="red" />);
        case "衣類":
            return () => (<Ionicons name="shirt" size={20} color="blue" />);
        case "ショッピング":
            return () => (<MaterialCommunityIcons name="baguette" size={20} color="green" />);
        case "旅行":
            return () => (<FontAwesome name="suitcase" size={20} color="orange" />);
        case "外食":
            return () => (<Ionicons name="restaurant" size={20} color="pink" />);
        case "健康":
            return () => (<MaterialIcons name="health-and-safety" size={20} color="gray" />);
        case "交通":
            return () => (<FontAwesome name="train" size={20} color="black" />);
        default:
            return () => null;
    }
};
