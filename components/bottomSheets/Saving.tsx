import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { Chip, Button } from 'react-native-paper';

interface SavingProps {
    onSavingSubmitted: (deposit: number) => void; // Updated to pass deposit value
}

export default function Saving({ onSavingSubmitted }: SavingProps) {
    const [amount, setAmount] = useState<number | null>(null);

    const handleChipPress = (value: number) => {
        setAmount(value);
    };

    const handleSubmit = async () => {
        const memo = "test income"; // Constant value for memo
        if (amount !== null) {
            try {
                const response = await fetch('http://15.168.108.6:8080/api/accounts/1/income', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJqb25nd29uMzM0MEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTcyMDAwODM5MSwiZXhwIjoxNzIwMDQ0MzkxfQ.KkxfUN1FEyZK9czPMNONaTStLxIr-WilKQMEOYNGFYg', // Replace with your actual token
                    },
                    body: JSON.stringify({ amount, memo }),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const { deposit, message } = responseData;

                    console.log('Deposit:', deposit);
                    console.log('Message:', message);

                    // Notify parent component that the saving has been submitted
                    onSavingSubmitted(deposit); // Pass deposit value to parent component
                } else {
                    // Handle errors
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Amount is null, cannot submit');
        }
    };

    return (
        <>
            <View>
                <Text>金額</Text>
                <Input
                    containerStyle={{ width: 'auto' }}
                    disabledInputStyle={{ backgroundColor: '#ddd' }}
                    inputContainerStyle={{}}
                    inputStyle={{ textAlign: 'right', padding: 5 }}
                    rightIcon={<Icon name="close" size={20} onPress={() => setAmount(null)} />}
                    rightIconContainerStyle={{}}
                    placeholder="¥ 10,000 "
                    onChangeText={(value) => setAmount(Number(value))}
                    value={amount?.toString() || ''}
                />
            </View>
            <View style={styles.chipContainer}>
                <Chip onPress={() => handleChipPress(3000)} mode="outlined" style={styles.chip}>3,000</Chip>
                <Chip onPress={() => handleChipPress(5000)} mode="outlined" style={styles.chip}>5,000</Chip>
                <Chip onPress={() => handleChipPress(7000)} mode="outlined" style={styles.chip}>7,000</Chip>
                <Chip onPress={() => handleChipPress(10000)} mode="outlined" style={styles.chip}>10,000</Chip>
            </View>

            <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: '#F48E35' }}>
                入金
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
        borderColor: '#F48E35',
    },
});
