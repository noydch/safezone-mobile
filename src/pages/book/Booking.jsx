import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Table, Tag } from 'antd'
import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate } from 'react-router'

const Booking = () => {
    const navigate = useNavigate()

    const getStatusColor = (status) => {
        switch (status) {
            case 'ຢືນຢັນແລ້ວ':
                return 'success'
            case 'ລໍຖ້າຢືນຢັນ':
                return 'warning'
            case 'ຍົກເລີກ':
                return 'error'
            default:
                return 'default'
        }
    }

    const columns = [
        {
            title: 'ລຳດັບການຈອງ',
            dataIndex: 'bookingNumber',
            key: 'bookingNumber',
            width: 70,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ວັນທີ/ເວລາຈອງ',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            width: 140,
            align: 'center',
            className: 'text-[10px] md:text-[12px] lg:text-[14px]',
            onCell: () => ({
                className: 'text-[10px] md:text-[12px] lg:text-[14px]'
            }),
        },
        {
            title: 'ຊື່ຜູ້ຈອງ',
            dataIndex: 'customerName',
            key: 'customerName',
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
            title: 'ຈຳນວນຄົນ',
            dataIndex: 'numberOfPeople',
            key: 'numberOfPeople',
            width: 100,
            align: 'center',
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
    ]

    // Sample data - replace with your actual data
    const data = [
        {
            key: '1',
            bookingNumber: 'B001',
            bookingDate: '2024-03-20',
            customerName: 'ທ. ສົມສັກ',
            status: 'ຢືນຢັນແລ້ວ',
            phoneNumber: '020 XXXXXXXX',
            numberOfPeople: '4 ຄົນ',
        },
        {
            key: '2',
            bookingNumber: 'B002',
            bookingDate: '2024-03-21',
            customerName: 'ທ. ສົມສັກ',
            status: 'ລໍຖ້າຢືນຢັນ',
            phoneNumber: '020 XXXXXXXX',
            numberOfPeople: '2 ຄົນ',
        },
        {
            key: '3',
            bookingNumber: 'B003',
            bookingDate: '2024-03-22',
            customerName: 'ທ. ສົມສັກ',
            status: 'ຍົກເລີກ',
            phoneNumber: '020 XXXXXXXX',
            numberOfPeople: '6 ຄົນ',
        },
    ]

    const handleViewDetails = (record) => {
        // Implement view details functionality
        console.log('View details for:', record)
    }

    return (
        <Navbar>
            <div className='px-2 md:px-10 lg:px-10'>
                <div className='my-2 flex items-center justify-between'>
                    <div onClick={() => navigate(-1)}
                        className='flex items-center gap-x-1 flex-[1]  cursor-pointer'>
                        <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                        <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                    </div>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍການຈອງ</h2>
                    <button
                        onClick={() => navigate('/booking/add')}
                        className='h-[30px] w-[100px] font-medium text-[12px] rounded bg-red-500 text-center text-white border-2 border-transparent hover:border-2 hover:bg-transparent hover:border-red-500 hover:text-red-500 duration-300 cursor-pointer'>
                        ເພີ່ມລາຍການຈອງ
                    </button>
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

export default Booking