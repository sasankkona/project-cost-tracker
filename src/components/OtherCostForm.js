// src/components/OtherCostForm.js
import React, { useState, useEffect } from 'react';
import { Box, Input, NumberInput, Button, HStack } from '@chakra-ui/react';
import { NumberInputField, useToast } from '@chakra-ui/react';

const OtherCostForm = ({ userId, onSubmit, initialData = null, onCancel }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const toast = useToast();

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
            setAmount(initialData.amount);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!description || amount <= 0) {
            toast({
                title: "Enter valid description and amount",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        onSubmit({ description, amount });
        setDescription('');
        setAmount(0);
    };

    return (
        <Box>
            <HStack spacing={2} mb={4}>
                <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <NumberInput value={amount} onChange={(val) => setAmount(Number(val))} min={0}>
                    <NumberInputField placeholder="Amount" />
                </NumberInput>
                <Button colorScheme="teal" onClick={handleSubmit}>
                    {initialData ? 'Update' : 'Add'}
                </Button>
                {initialData && <Button onClick={onCancel}>Cancel</Button>}
            </HStack>
        </Box>
    );
};

export default OtherCostForm;
