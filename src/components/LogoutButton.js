// src/components/LogoutButton.js
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice';

const LogoutButton = () => {
    const dispatch = useDispatch();

    return (
        <Button colorScheme="red" onClick={() => dispatch(logoutUser())}>
            Logout
        </Button>
    );
};

export default LogoutButton;
