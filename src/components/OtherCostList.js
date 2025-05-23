// src/components/OtherCostList.js
import React from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const OtherCostList = ({ costs, onEdit, onDelete }) => {
    return (
        <Box>
            {costs.map((cost) => (
                <Flex key={cost.id} justify="space-between" mb={2}>
                    <Text>{cost.description} - ₹{cost.amount}</Text>
                    <Box>
                        <IconButton icon={<EditIcon />} size="sm" mr={2} onClick={() => onEdit(cost)} />
                        <IconButton icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => onDelete(cost.id)} />
                    </Box>
                </Flex>
            ))}
        </Box>
    );
};

export default OtherCostList;
