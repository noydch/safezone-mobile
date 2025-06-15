import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Drawer, Button, Typography, List, InputNumber, Select, Space, message } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import useSafezoneStore from '../../store/safezoneStore';
import { createOrderApi } from '../../api/order';

// Destructure Text from Typography
const { Text } = Typography;
const { Option } = Select;

const Cart = ({ isOpen, onClose }) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ดึงข้อมูลและ actions จาก store
    const carts = useSafezoneStore((state) => state.carts);
    const token = useSafezoneStore((state) => state.token);
    const user = useSafezoneStore((state) => state.user);
    const tables = useSafezoneStore((state) => state.tables);
    const listTable = useSafezoneStore((state) => state.listTable);
    const actionUpdateCart = useSafezoneStore((state) => state.actionUpdateCart);
    const actionRemoveFromCart = useSafezoneStore((state) => state.actionRemoveFromCart);
    const actionClearCart = useSafezoneStore((state) => state.actionClearCart);

    useEffect(() => {
        listTable();
    }, [listTable]);

    // จัดการการเลือกโต๊ะ
    const handleChange = (value) => {
        setSelectedTable(value === '0' ? null : value);
    };

    // จัดการการอัปเดตจำนวนสินค้า
    const handleUpdateCart = (itemId, type, name, qty) => {
        if (qty <= 0) return;
        actionUpdateCart(itemId, type, name, qty);
    };

    // จัดการการลบสินค้า
    const handleRemoveItem = (itemId, type, name) => {
        actionRemoveFromCart(itemId, type, name);
    };

    // คำนวณราคารวม
    const calculateTotal = () => {
        return carts.reduce((total, item) => total + (item.qty * item.price), 0);
    };

    // จัดการการเพิ่มรายการไปยังโต๊ะ
    const handleCreateOrder = async () => {
        if (!selectedTable) {
            message.warning('ກະລຸນາເລືອກໂຕະກ່ອນ');
            return;
        }
        if (carts.length === 0) {
            message.warning('ກະຕ່າສິນຄ້າຫວ່າງເປົ່າ');
            return;
        }

        setIsLoading(true);

        const orderData = {
            tableId: selectedTable,
            empId: user.id,
            orderDetails: carts.map(item => ({
                itemId: item.id,
                itemType: item.type,
                quantity: item.qty,
                price: item.price
            }))
        };

        try {
            const response = await createOrderApi(token, orderData);
            if (response && (response.status === 200 || response.status === 201)) {
                message.success('ເພີ່ມລາຍການສຳເລັດ!');
                actionClearCart();
                setSelectedTable(null);
                onClose();
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມລາຍການ');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Backdrop with reduced opacity */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={onClose}
                />
            )}

            {/* Cart Drawer */}
            <div className={`fixed right-0 top-0 h-full w-[320px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">ກະຕ່າສິນຄ້າ</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                                <IoMdClose size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Table Selection */}
                    <div className="py-4 px-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">ເລືອກໂຕະ:</span>
                            <Select
                                value={selectedTable || '0'}
                                style={{ width: 140 }}
                                onChange={handleChange}
                                options={[
                                    { value: '0', label: 'ກະລຸນາເລືອກໂຕະ' },
                                    ...(tables?.map(table => ({
                                        value: table.id.toString(),
                                        label: `ໂຕະ ${table.table_number}`
                                    })) || [])
                                ]}
                            />
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto px-4">
                        {carts.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                ບໍ່ມີສິນຄ້າໃນກະຕ່າ
                            </div>
                        ) : (
                            <ul className="space-y-4 mt-4">
                                {carts.map((item) => (
                                    <li key={`${item.type}-${item.id}`} className="flex items-center gap-3 border p-2 rounded">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => handleUpdateCart(item.id, item.type, item.name, item.qty - 1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        <HiMinus />
                                                    </button>
                                                    <span className="px-2">{item.qty}</span>
                                                    <button
                                                        onClick={() => handleUpdateCart(item.id, item.type, item.name, item.qty + 1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        <HiPlus />
                                                    </button>
                                                </div>
                                                <p className="text-green-600 font-semibold">
                                                    {(item.price * item.qty).toLocaleString()} ກີບ
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item.id, item.type, item.name)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-50 border-t">
                        <div className="flex justify-between mb-4">
                            <span className="font-medium">ລວມທັງໝົດ</span>
                            <span className="text-xl font-bold text-green-600">
                                {calculateTotal().toLocaleString()} ກີບ
                            </span>
                        </div>
                        <button
                            onClick={handleCreateOrder}
                            disabled={isLoading || carts.length === 0 || !selectedTable}
                            className={`w-full py-2 rounded text-white font-medium
                                ${isLoading || carts.length === 0 || !selectedTable
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {isLoading ? 'ກຳລັງເພີ່ມລາຍການ...' : 'ດຳເນີນການ'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;