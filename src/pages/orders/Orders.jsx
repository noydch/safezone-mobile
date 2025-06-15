import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Table, Tag, Spin, Alert, message } from 'antd'
import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate } from 'react-router'
import axios from 'axios'
import ApiPath from '../../api/apiPath'
import moment from 'moment'
import useSafezoneStore from '../../store/safezoneStore'
import { getAllOrdersApi } from '../../api/order'

const ORDER_STATUSES = [
    { value: 'PENDING', label: 'ລໍຖ້າຄິວ/ລໍຖ້າຄົວ', color: 'orange' },
    { value: 'COOKING', label: 'ກຳລັງປຸງແຕ່ງ', color: 'processing' },
    { value: 'READY', label: 'ພ້ອມເສີບ', color: 'cyan' },
    { value: 'SERVED', label: 'ເສີບແລ້ວ', color: 'blue' },
    { value: 'PAID', label: 'ຈ່າຍເງິນແລ້ວ', color: 'success' },
]

const PAYMENT_METHODS = [
    { value: 'CASH', label: 'ເງິນສົດ', color: 'green' },
    { value: 'TRANSFER', label: 'ເງິນໂອນ', color: 'blue' },
    { value: 'ຍັງບໍ່ທັນຊຳລະເງິນ', label: 'ຍັງບໍ່ທັນຊຳລະເງິນ', color: 'red' },
]

const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = useSafezoneStore((state) => state.token)

    const getPaymentMethodLabel = (method) => {
        const payment = PAYMENT_METHODS.find(p => p.value === method)
        return payment ? payment.label : method
    }

    const getPaymentMethodColor = (method) => {
        const payment = PAYMENT_METHODS.find(p => p.value === method)
        return payment ? payment.color : 'default'
    }

    // Define columns for the table
    const columns = [
        {
            title: <p className='text-center'>ລະຫັດອໍເດີ</p>,
            dataIndex: 'orderID',
            key: 'orderID',
            width: 100,
            render: (text) => <p className='text-center'>{text}</p>
        },
        {
            title: 'ວັນ ແລະ ເວລາ',
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: 150,
        },
        {
            title: 'ຊື່ຜູ້ສ້າງອໍເດີ',
            dataIndex: 'employee',
            key: 'employee',
            width: 150,
        },
        {
            title: 'ເບີໂທ (ຜູ້ສ້າງ)',
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
        },
        {
            title: 'ລາຄາລວມ',
            dataIndex: 'total',
            key: 'total',
            width: 120,
            align: 'right',
            render: (text) => <p style={{ textAlign: 'right' }}>{text}</p>
        },
        {
            title: 'ວິທີຊຳລະ',
            dataIndex: 'payment_method',
            key: 'payment_method',
            width: 120,
            render: (method) => (
                <Tag color={getPaymentMethodColor(method)}>
                    {getPaymentMethodLabel(method)}
                </Tag>
            ),
        },
        {
            title: <p className='text-center'>ລາຍລະອຽດ</p>,
            key: 'more',
            width: 120,
            align: 'center',
            render: (_, record) => (
                <a onClick={() => navigate(`/orders/orderDetail/${record.orderID}`)}>
                    ເບິ່ງລາຍລະອຽດ
                </a>
            ),
        },
    ]

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await getAllOrdersApi(token)
                const formattedData = response.data
                    .filter(order => !order.payment_method)
                    .map(order => ({
                        key: order.id,
                        orderID: order.id,
                        dateTime: moment(order.orderDate).format('DD/MM/YYYY HH:mm'),
                        employee: order.employee ? `${order.employee.fname} ${order.employee.lname}` : 'ບໍ່ມີຂໍ້ມູນ',
                        status: order.kitchenStatus,
                        phone: order.employee ? order.employee.phone : 'ບໍ່ມີຂໍ້ມູນ',
                        total: (order.total_price || 0).toLocaleString() + ' ກີບ',
                        payment_method: order.payment_method || 'ຍັງບໍ່ທັນຊຳລະເງິນ',
                    }))
                setOrders(formattedData)
            } catch (err) {
                console.error("ຜິດພາດໃນການດຶງຂໍ້ມູນອໍເດີ:", err)
                const errorMsg = err.response?.data?.message || 'ການໂຫຼດຂໍ້ມູນອໍເດີລົ້ມເຫລວ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.'
                setError(errorMsg)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [token])

    if (loading) {
        return (
            <Navbar>
                <div className='px-2 md:px-10 lg:px-10'>
                    <div className='my-2 flex items-center justify-between'>
                        <div onClick={() => navigate(-1)} className='flex items-center gap-x-1 flex-[1]'>
                            <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                            <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                        </div>
                        <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍການອໍເດີ</h2>
                        <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium text-start flex-[1]'></h2>
                    </div>
                    <div className='bg-white rounded p-2 md:p-4 lg:p-4 h-screen flex items-center justify-center'>
                        <Spin size="large" />
                    </div>
                </div>
            </Navbar>
        )
    }

    if (error) {
        return (
            <Navbar>
                <div className='px-2 md:px-10 lg:px-10'>
                    <div className='my-2 flex items-center justify-between'>
                        <div onClick={() => navigate(-1)} className='flex items-center gap-x-1 flex-[1]'>
                            <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                            <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                        </div>
                        <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍການອໍເດີ</h2>
                        <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium text-start flex-[1]'></h2>
                    </div>
                    <div className='bg-white rounded p-2 md:p-4 lg:p-4 h-screen'>
                        <Alert message="ຜິດພາດ" description={error} type="error" showIcon />
                    </div>
                </div>
            </Navbar>
        )
    }

    return (
        <Navbar>
            <div className='px-2 md:px-10 lg:px-10'>
                <div className='my-2 flex items-center justify-between'>
                    <div onClick={() => navigate(-1)} className='flex items-center gap-x-1 flex-[1]'>
                        <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                        <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                    </div>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍການອໍເດີ</h2>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium text-start flex-[1]'></h2>
                </div>
                <div className='bg-white rounded p-2 md:p-4 lg:p-4 h-screen'>
                    <Table
                        columns={columns}
                        dataSource={orders}
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