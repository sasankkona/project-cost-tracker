// src/components/ItemList.js
import React from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ItemList = ({ items, onEdit, onDelete }) => {
    return (
        <Box>
            {items.map((item) => (
                <Flex key={item.id} justify="space-between" mb={2}>
                    <Text>{item.name} - ₹{item.cost}</Text>
                    <Box>
                        <IconButton icon={<EditIcon />} size="sm" mr={2} onClick={() => onEdit(item)} />
                        <IconButton icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => onDelete(item.id)} />
                    </Box>
                </Flex>
            ))}
        </Box>
    );
};

export default ItemList;
