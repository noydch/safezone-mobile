import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Drawer, Button, Typography, List, InputNumber, Select, Space } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

// Destructure Text from Typography
const { Text } = Typography;
const { Option } = Select;

// Sample data for cart items (increased for demonstration)
const sampleCartItems = [
    {
        id: 1,
        name: "ນ້ຳດື່ມ ຕຸກນ້ອຍ",
        price: 5000,
        quantity: 1,
        image: "https://via.placeholder.com/60x60?text=Water"
    },
    {
        id: 2,
        name: "ເຂົ້າຜັດກ้ຸง",
        price: 40000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 3,
        name: "ລາບຫມູ",
        price: 45000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 4,
        name: "ເຂົ້າຫມູກອບ",
        price: 50000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 5,
        name: "ຂ້າວເຫຼົ້າ",
        price: 30000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 6,
        name: "ຕົ້ມຍຳກຸ້ງ",
        price: 60000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 7,
        name: "ຂົ້ວປາ",
        price: 40000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 8,
        name: "ເຂົ້າຫມູທອດ",
        price: 45000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 9,
        name: "ຂົ້ວຫມູ",
        price: 42000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 10,
        name: "ຂົ້ວໄກ່",
        price: 42000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 11,
        name: "ຂົ້ວກ้ຸง",
        price: 48000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 12,
        name: "ຂົ້ວປູ",
        price: 48000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=60&q=80"
    },
    {
        id: 13,
        name: "ຂົ້ວປີ້ງ",
        price: 50000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=60&q=80"
    },
];

const Cart = ({ isOpen, onClose }) => {
    // Use sample data for demonstration
    const cartItems = sampleCartItems;

    // Calculate total price
    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);

    // Placeholder functions for quantity change and removal (using sample data)
    const handleQuantityChange = (itemId, quantity) => {
        console.log(`Change quantity for item ${itemId} to ${quantity}`);
        // In a real app, you would update state here
    };

    const handleRemoveItem = (itemId) => {
        console.log(`Remove item ${itemId}`);
        // In a real app, you would update state here
    };


    return (
        <Drawer
            title={
                <div className="flex justify-between items-center p-0 w-full">
                    <div className="flex-grow text-center ml-8">
                        <h2 className="text-xl font-semibold text-gray-800">ກະຕ່າສິນຄ້າ</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 absolute top-4 right-4 z-10">
                        <IoMdClose size={24} />
                    </button>
                </div>
            }
            placement="right"
            closable={false}
            onClose={onClose}
            open={isOpen}
            maskClosable={true}
            getContainer={false}
            width={320}
            style={{ position: 'fixed' }}
            bodyStyle={{ padding: '0' }}
            headerStyle={{ borderBottom: '1px solid #f0f0f0', padding: '16px' }}
        >
            <div className="flex flex-col h-full">
                <div className="py-4 px-4 border-b border-gray-200 flex items-center gap-x-3 flex-shrink-0">
                    <span className="text-sm text-gray-700">ເລືອກໂຕະ:</span>
                    <Select defaultValue="placeholder" size="medium" className='w-[150px]'>
                        <Option value="placeholder" disabled>ກະລຸນນເລືອກໂຕະ</Option>
                        <Option value="table1">ໂຕະ 1</Option>
                        <Option value="table2">ໂຕະ 2</Option>
                    </Select>
                </div>

                {/* This div is the scrollable area */}
                <div className="flex-grow overflow-y-auto px-4" style={{ paddingBottom: '16px' }}>
                    {cartItems && cartItems.length > 0 ? (
                        <ul className="space-y-4 mt-4">
                            {cartItems.map((item, index) => ( // Added index for unique key if id can be duplicated
                                <li key={item.id || index} className="flex items-center gap-3 border p-1 rounded-[4px] border-gray-200 relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded border border-gray-200"
                                    />
                                    <div className="flex-1 flex flex-col justify-between h-16">
                                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                        <div className=' flex justify-between items-end'>
                                            <div className='flex items-center border border-gray-200 p-0.5 rounded-[2px] gap-2 mt-1'>
                                                <button className="w-5 h-5 bg-gray-200 text-gray-700 rounded flex items-center justify-center text-sm" onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}>-</button>
                                                <span className='text-sm text-gray-800'>{item.quantity || 0}</span>
                                                <button className="w-5 h-5 bg-gray-200 text-gray-700 rounded flex items-center justify-center text-sm" onClick={() => handleQuantityChange(item.id, (item.quantity || 0) + 1)}>+</button>
                                            </div>
                                            <p className="text-green-600 text-[14px] font-semibold">{item.price.toLocaleString()} ກີບ</p>
                                        </div>
                                    </div>
                                    <button className="absolute top-1 right-1 text-red-500 hover:text-red-700" onClick={() => handleRemoveItem(item.id)}>
                                        <FaRegTrashAlt size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            ບໍ່ມີສິນຄ້າໃນກະຕ່າ
                        </div>
                    )}
                </div>

                <div className="py-4 px-4 border-b border-gray-200 flex items-center justify-center gap-x-3 flex-shrink-0">
                    <span className="text-sm text-gray-700">ວິທີຊຳລະ:</span>
                    <Select defaultValue="placeholder" size="medium">
                        <Option value="placeholder" disabled>ເລືອກການຊຳລະ</Option>
                        <Option value="cash">ເງິນສົດ</Option>
                        <Option value="transfer">ໂອນ</Option>
                    </Select>
                </div>

                <div className="p-4 bg-gray-50 flex-shrink-0 mt-auto"> {/* Added mt-auto to push footer down if list is short */}
                    <div className="flex justify-between mb-4">
                        <span className="font-medium text-gray-700">ລວມທັງໝົດ</span>
                        <span className="font-semibold text-green-600 text-lg">{total.toLocaleString()} ກີບ</span>
                    </div>
                    <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-[16px] font-medium">
                        ດໍາເນີນການຕໍ່
                    </button>
                </div>
            </div>
        </Drawer>
    );
};

export default Cart;