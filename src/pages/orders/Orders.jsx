import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Table, Tag } from 'antd'
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router';

const Orders = () => {
    const navigate = useNavigate()

    const getStatusColor = (status) => {
        switch (status) {
            case 'ສຳເລັດ':
                return 'success';
            case 'ລໍຖ້າ':
                return 'warning';
            case 'ຍົກເລີກ':
                return 'error';
            default:
                return 'default';
        }
    };

    // Define columns for the table
    const columns = [
        {
            title: 'ລຳດັບອໍເດີ',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            width: 70,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ວັນທີ/ເວລາຂາຍ',
            dataIndex: 'saleDate',
            key: 'saleDate',
            width: 140,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ຊື່ຜູ້ຂາຍ',
            dataIndex: 'sellerName',
            key: 'sellerName',
            width: 100,
            ellipsis: true,
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ສະຖານະ',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
            render: (status) => (
                <Tag color={getStatusColor(status)} className="text-[10px] md:text-[12px] lg:text-[14px]">
                    {status}
                </Tag>
            ),
        },
        {
            title: 'ເບີໂທ',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 120,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ລາຄາລວມ',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 120,
            align: 'right',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ລາຍລະອຽດ',
            key: 'details',
            width: 100,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
            render: (_, record) => (
                <a onClick={() => handleViewDetails(record)} className="text-[10px] md:text-[12px] lg:text-[14px]">ເບິ່ງລາຍລະອຽດ</a>
            ),
        },
    ];

    // Sample data - replace with your actual data
    const data = [
        {
            key: '1',
            orderNumber: '001',
            saleDate: '2024-03-20',
            sellerName: 'ທ. ສົມສັກ',
            status: 'ສຳເລັດ',
            phoneNumber: '020 XXXXXXXX',
            totalPrice: '150,000 ₭',
        },
        {
            key: '2',
            orderNumber: '002',
            saleDate: '2024-03-20',
            sellerName: 'ທ. ສົມສັກ',
            status: 'ລໍຖ້າ',
            phoneNumber: '020 XXXXXXXX',
            totalPrice: '150,000 ₭',
        },
        {
            key: '3',
            orderNumber: '003',
            saleDate: '2024-03-20',
            sellerName: 'ທ. ສົມສັກ',
            status: 'ຍົກເລີກ',
            phoneNumber: '020 XXXXXXXX',
            totalPrice: '150,000 ₭',
        },
    ];

    const handleViewDetails = (record) => {
        // Implement view details functionality
        console.log('View details for:', record);
    };

    return (
        <Navbar>
            <div className='px-2 md:px-10 lg:px-10'>
                <div className='my-2 flex items-center justify-between'>
                    <div onClick={() => navigate(-1)}
                        className='flex items-center gap-x-1 flex-[1]'>
                        <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                        <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                    </div>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍການອໍເດີ</h2>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium text-start flex-[1]'></h2>
                </div>
                <div className='bg-white rounded p-2 md:p-4 lg:p-4 h-screen'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 'max-content' }}
                        size="small"
                        className="text-[10px] md:text-[12px] lg:text-[14px] rounded"
                    />
                </div>
            </div>
        </Navbar>
    )
}

export default Orders