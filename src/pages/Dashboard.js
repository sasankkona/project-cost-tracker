import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Flex, Spacer, Input, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from '../slices/itemsSlice'; 
import LogoutButton from '../components/LogoutButton';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import OtherCostList from '../components/OtherCostList'; 
import OtherCostForm from '../components/OtherCostForm';
import {fetchOtherCosts, addOtherCost, updateOtherCost, deleteOtherCost} from '../slices/otherCostsSlice'; 
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    
    const user = useSelector((state) => state.auth.user) || { uid: 'testUserId', email: 'testuser@example.com' };
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.list) || [
        { id: '1', name: 'Test Item 1', cost: 100 },
        { id: '2', name: 'Test Item 2', cost: 200 }
    ];
    const [selectedItem,setSelectedItem] = useState(null); 
    const otherCosts = useSelector((state) => state.otherCosts.list) || [
        { id: '1', description: 'Test Cost 1', amount: 50 },
        { id: '2', description: 'Test Cost 2', amount: 75 }
    ];
    const [selectedCost, setSelectedCost] = useState(null);

    // Filter and sort states for items
    const [itemFilter, setItemFilter] = useState('');
    const [itemSort, setItemSort] = useState('name-asc');

    // Filter and sort states for other costs
    const [costFilter, setCostFilter] = useState('');
    const [costSort, setCostSort] = useState('description-asc');

    const filterAndSortItems = () => {
        let filtered = items.filter(item => item.name.toLowerCase().includes(itemFilter.toLowerCase()));
        switch(itemSort) {
            case 'name-asc':
                filtered.sort((a,b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a,b) => b.name.localeCompare(a.name));
                break;
            case 'cost-asc':
                filtered.sort((a,b) => a.cost - b.cost);
                break;
            case 'cost-desc':
                filtered.sort((a,b) => b.cost - a.cost);
                break;
            default:
                break;
        }
        return filtered;
    };

    const filterAndSortCosts = () => {
        let filtered = otherCosts.filter(cost => cost.description.toLowerCase().includes(costFilter.toLowerCase()));
        switch(costSort) {
            case 'description-asc':
                filtered.sort((a,b) => a.description.localeCompare(b.description));
                break;
            case 'description-desc':
                filtered.sort((a,b) => b.description.localeCompare(a.description));
                break;
            case 'amount-asc':
                filtered.sort((a,b) => a.amount - b.amount);
                break;
            case 'amount-desc':
                filtered.sort((a,b) => b.amount - a.amount);
                break;
            default:
                break;
        }
        return filtered;
    };

    const filteredItems = filterAndSortItems();
    const filteredCosts = filterAndSortCosts();

    const totalItemCost = filteredItems.reduce((acc,item)=>acc+Number(item.cost),0);
    const totalOtherCost = filteredCosts.reduce((acc,cost)=>acc+Number(cost.amount),0);
    const totalCost = totalItemCost + totalOtherCost;

    const data = [
        { name: 'Items', value: totalItemCost },
        { name: 'Other Costs', value: totalOtherCost }
    ];

    const COLORS = ['#0088FE', '#FF8042'];

    useEffect(() => {
        if (user && user.uid !== 'testUserId') {
            dispatch(fetchItems(user.uid));
            dispatch(fetchOtherCosts(user.uid));
        }
    }, [user, dispatch]);

    return (
        <Box p="6">
            <Flex align="center" mb="6">
                <Box>
                    <Heading size="lg">Project Cost Tracker</Heading>
                    <Text fontSize="md" color="gray.600">Welcome, {user?.email}</Text>
                </Box>
                <Spacer />
                <LogoutButton />
            </Flex>
            <Box>
                <Heading size="md" mb="4">Items</Heading>
                <ItemForm 
                userId={user.uid} 
                onSubmit={({name,cost})=>{
                    if(selectedItem){
                        dispatch(updateItem({userId:user.uid,id:selectedItem.id,name,cost}));
                    }else{
                        dispatch(addItem({userId:user.uid,name,cost}));
                    }
                    setSelectedItem(null);
                }} 
                initialData={selectedItem} 
                onCancel={()=>setSelectedItem(null)} 
                />
                <Flex mb="4" align="center" gap="4">
                    <Input 
                        placeholder="Filter items by name" 
                        value={itemFilter} 
                        onChange={(e) => setItemFilter(e.target.value)} 
                        maxW="200px"
                    />
                    <Select value={itemSort} onChange={(e) => setItemSort(e.target.value)} maxW="200px">
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-desc">Name Descending</option>
                        <option value="cost-asc">Cost Ascending</option>
                        <option value="cost-desc">Cost Descending</option>
                    </Select>
                </Flex>
                <ItemList 
                items={filteredItems} 
                onEdit={(item)=>setSelectedItem(item)} 
                onDelete={(id)=>dispatch(deleteItem({userId:user.uid,id}))}
                />
            </Box>

            <Box mt="8">
                <Heading size="md" mb="4">Other Costs</Heading>
                <OtherCostForm 
                userId={user.uid}
                onSubmit={({description,amount})=>{
                    if(selectedCost){
                        dispatch(updateOtherCost({userId:user.uid,id:selectedCost.id,description,amount}));
                    }else{
                        dispatch(addOtherCost({userId:user.uid,description,amount}));
                    }
                    setSelectedCost(null);
                }}
                initialData = {selectedCost}
                onCancel = {()=>setSelectedCost(null)}
                />
                <Flex mb="4" align="center" gap="4">
                    <Input 
                        placeholder="Filter costs by description" 
                        value={costFilter} 
                        onChange={(e) => setCostFilter(e.target.value)} 
                        maxW="200px"
                    />
                    <Select value={costSort} onChange={(e) => setCostSort(e.target.value)} maxW="200px">
                        <option value="description-asc">Description Ascending</option>
                        <option value="description-desc">Description Descending</option>
                        <option value="amount-asc">Amount Ascending</option>
                        <option value="amount-desc">Amount Descending</option>
                    </Select>
                </Flex>
                <OtherCostList
                    costs={filteredCosts}
                    onEdit={(cost) => setSelectedCost(cost)}
                    onDelete={(id) => dispatch(deleteOtherCost({ userId: user.uid, id }))}
                />
            </Box>

            <Box mt="8">
                <Heading size="lg">Total Cost: ₹{totalCost}</Heading>
            </Box>

            <Box mt="8" height="300px">
                <Heading size="md" mb="4">Cost Summary</Heading>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default Dashboard;
