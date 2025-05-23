import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { Box, Input, Button, Heading, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            toast({
                title: "Fill in all fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                toast({
                    title: "Logged in successfully",
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

    const handlePasswordReset = () => {
        if (!resetEmail) {
            toast({
                title: "Please enter your email",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const auth = getAuth();
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                toast({
                    title: "Password reset email sent",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            })
            .catch((error) => {
                toast({
                    title: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box maxW={{ base: "90%", sm: "400px" }} mx="auto" mt={{ base: 6, md: 10 }} p={{ base: 4, md: 6 }} boxShadow="md" borderRadius="md">
            <Heading mb="4" textAlign="center">Log In</Heading>
            <FormControl mb="2">
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <VStack spacing={4} align="stretch">
                <Button variant="link" colorScheme="blue" onClick={onOpen}>
                    Forgot Password?
                </Button>
                <Button isLoading={loading} onClick={handleLogin} colorScheme="teal" width="full">
                    Log In
                </Button>
            </VStack>
            {error && <Box mt="2" color="red.500" textAlign="center">{error}</Box>}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reset Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter your email</FormLabel>
                            <Input
                                placeholder="Email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handlePasswordReset}>
                            Send Reset Email
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Login;
