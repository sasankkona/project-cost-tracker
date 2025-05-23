// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import { Box, Input, NumberInput, Button, HStack } from '@chakra-ui/react';
import { NumberInputField, useToast } from '@chakra-ui/react';

const ItemForm = ({ userId, onSubmit, initialData = null, onCancel }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const toast = useToast();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setCost(initialData.cost);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!name || cost <= 0) {
            toast({
                title: "Please enter valid name and cost",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        onSubmit({ name, cost });
        setName('');
        setCost(0);
    };

    return (
        <Box>
            <HStack spacing={2} mb={4}>
                <Input placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
                <NumberInput value={cost} onChange={(value) => setCost(Number(value))} min={0}>
                    <NumberInputField placeholder="Cost" />
                </NumberInput>
                <Button colorScheme="teal" onClick={handleSubmit}>
                    {initialData ? 'Update' : 'Add'}
                </Button>
                {initialData && <Button onClick={onCancel}>Cancel</Button>}
            </HStack>
        </Box>
    );
};

export default ItemForm;
