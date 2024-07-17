import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { Chip, Button } from 'react-native-paper';

interface SavingProps {
    onSavingSubmitted: (deposit: number) => void;
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
                const response = await fetch('http://10.0.2.2:3000/api/accounts/1/income', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount, memo, memberId: 1 }),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const { deposit, message } = responseData;

                    console.log('Deposit:', deposit);
                    console.log('Message:', message);

                    // Notify parent component that the saving has been submitted
                    onSavingSubmitted(deposit);

                    // Reset amount after successful submission
                    setAmount(null);
                } else {
                    const errorText = await response.text();
                    console.error('Error:', response.status, errorText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Amount is null, cannot submit');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>金額</Text>
            <Input
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputInnerContainer}
                inputStyle={styles.input}
                rightIcon={<Icon name="close" size={20} onPress={() => setAmount(null)} />}
                placeholder="¥ 10,000"
                keyboardType="numeric"
                onChangeText={(value) => setAmount(value ? Number(value) : null)}
                value={amount?.toString() || ''}
            />
            <View style={styles.chipContainer}>
                {[3000, 5000, 7000, 10000].map((value) => (
                    <Chip
                        key={value}
                        onPress={() => handleChipPress(value)}
                        mode="outlined"
                        style={[styles.chip, amount === value && styles.selectedChip]}
                    >
                        {value.toLocaleString()}
                    </Chip>
                ))}
            </View>
            <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                disabled={amount === null}
            >
                入金
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#F48E35',
    },
    inputContainer: {
        paddingHorizontal: 0,
    },
    inputInnerContainer: {
        borderBottomColor: '#F48E35',
    },
    input: {
        textAlign: 'right',
        padding: 5,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    chip: {
        marginRight: 5,
        marginBottom: 5,
        borderColor: '#F48E35',
    },
    selectedChip: {
        backgroundColor: '#F48E35',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#F48E35',
    },
});