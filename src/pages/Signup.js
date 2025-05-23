import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../slices/authSlice';
import { Box, Input, Button, Heading } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth);
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !password) {
            toast({
                title: "Fill in all fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        dispatch(signupUser({ email, password }))
            .unwrap()
            .then(() => {
                toast({
                    title: "Signed up successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/dashboard');
            })
            .catch(err => toast({
                title: err,
                status: "error",
                duration: 3000,
                isClosable: true,
            }));
    };

    return (
        <Box maxW={{ base: "90%", sm: "400px" }} mx="auto" mt={{ base: 6, md: 10 }} p={{ base: 4, md: 6 }} boxShadow="md" borderRadius="md">
            <Heading mb="4" textAlign="center">Sign Up</Heading>
            <Input placeholder="Email" mb="2" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" mb="4" onChange={(e) => setPassword(e.target.value)} />
            <Button isLoading={loading} onClick={handleSignup} colorScheme="teal" width="full">Sign Up</Button>
            {error && <Box mt="2" color="red.500" textAlign="center">{error}</Box>}
        </Box>
    );
};

export default Signup;
