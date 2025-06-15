import React, { useState, useEffect } from 'react'
import { Table, Spin, Alert, Button, Tag, message, Modal, Select, Space } from 'antd'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderByIdApi, updateRoundStatusApi, checkoutOrderApi } from '../../api/order'
import useSafezoneStore from '../../store/safezoneStore'
import { MdArrowBackIos } from 'react-icons/md'
import { FaMoneyBillWave } from "react-icons/fa"

const ORDER_STATUSES = [
    { value: 'PENDING', label: 'ລໍຖ້າຄິວ/ລໍຖ້າຄົວ', color: 'orange' },
    { value: 'COOKING', label: 'ກຳລັງປຸງແຕ່ງ', color: 'processing' },
    { value: 'READY', label: 'ພ້ອມເສີບ', color: 'cyan' },
    { value: 'SERVED', label: 'ເສີບແລ້ວ', color: 'blue' },
    { value: 'PAID', label: 'ຈ່າຍເງິນແລ້ວ', color: 'success' },
    { value: 'CANCELLED', label: 'ຍົກເລີກ', color: 'red' },
    { value: 'OPEN', label: 'ເປີດຢູ່', color: 'geekblue' },
]

const PaymentOptions = [
    { value: 'CASH', label: 'ເງິນສົດ' },
    { value: 'TRANSFER', label: 'ເງິນໂອນ' },
]

const columns = [
    {
        title: 'ລາຍການ',
        dataIndex: 'item',
        key: 'item',
        width: 120,
        render: (_, record) => {
            if (record.food) {
                return record.food.name || `ໄອດີອາຫານ: ${record.foodId}`
            } else if (record.drink) {
                return record.drink.name || `ໄອດີເຄື່ອງດື່ມ: ${record.drinkId}`
            }
            return 'N/A'
        },
    },
    {
        title: 'ຈຳນວນ',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 80,
        align: 'center',
    },
    {
        title: 'ລາຄາ',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        align: 'right',
        render: (price) => `${price ? price.toLocaleString() : 0} ກີບ`,
    },
    {
        title: 'ລາຄາລວມ',
        key: 'totalPrice',
        width: 100,
        align: 'right',
        render: (_, record) => {
            const totalPrice = (record.quantity || 0) * (record.price || 0)
            return `${totalPrice.toLocaleString()} ກີບ`
        }
    },
]

const getStatusColor = (statusValue) => ORDER_STATUSES.find(s => s.value === statusValue)?.color || 'default'
const getStatusLabel = (statusValue) => ORDER_STATUSES.find(s => s.value === statusValue)?.label || statusValue

const OrderDetail = () => {
    const { id: orderId } = useParams()
    const token = useSafezoneStore((state) => state.token)
    const user = useSafezoneStore((state) => state.user)
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [updatingStatus, setUpdatingStatus] = useState({})
    const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [checkoutLoading, setCheckoutLoading] = useState(false)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!token || !orderId) {
                setError(!orderId ? "ບໍ່ພົບ Order ID ໃນ URL." : "ຕ້ອງການ Token ໃນການເຂົ້າເຖິງຂໍ້ມູນ.")
                setLoading(false)
                return
            }
            try {
                setLoading(true)
                setError(null)
                const response = await getOrderByIdApi(token, orderId)
                if (response && response.data) {
                    setOrder(response.data)
                } else {
                    setError("ບໍ່ພົບຂໍ້ມູນຄຳສັ່ງຊື້ທີ່ລະບຸ.")
                }
            } catch (err) {
                console.error("Error fetching order details:", err)
                setError(err.response?.data?.message || "ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນລາຍລະອຽດຄຳສັ່ງຊື້.")
            } finally {
                setLoading(false)
            }
        }
        fetchOrderDetails()
    }, [orderId, token])

    const handleStatusChange = async (roundId, newStatus) => {
        setUpdatingStatus(prev => ({ ...prev, [roundId]: true }))
        try {
            await updateRoundStatusApi(token, roundId, newStatus)
            setOrder(prevOrder => ({
                ...prevOrder,
                orderRounds: prevOrder.orderRounds.map(round =>
                    round.id === roundId ? { ...round, kitchenStatus: newStatus } : round
                )
            }))
            message.success(`ອັບເດດສະຖານະຮອບ ${roundId} ເປັນ '${getStatusLabel(newStatus)}' ສຳເລັດ.`)
        } catch (err) {
            console.error("ຜິດພາດໃນການອັບເດດສະຖານະຮອບ:", err)
            message.error(`ຜິດພາດ: ${err.response?.data?.message || 'ການອັບເດດສະຖານະລົ້ມເຫລວ'}`)
        } finally {
            setUpdatingStatus(prev => ({ ...prev, [roundId]: false }))
        }
    }

    const renderStatusButton = (round) => {
        if (!user || !user.role || !order || order.billStatus !== 'OPEN') return null

        const commonProps = {
            loading: updatingStatus[round.id],
            size: "small"
        }

        if (user.role === 'CHEF' || user.role === 'Chef') {
            if (round.kitchenStatus === 'PENDING') {
                return <Button type="primary" {...commonProps} onClick={() => handleStatusChange(round.id, 'COOKING')}>ເລີ່ມເຮັດ</Button>
            } else if (round.kitchenStatus === 'COOKING') {
                return <Button type="primary" {...commonProps} onClick={() => handleStatusChange(round.id, 'READY')}>ພ້ອມເສີບ</Button>
            }
        } else if (user.role === 'WAITER' || user.role === 'Waiter') {
            if (round.kitchenStatus === 'READY') {
                return <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} {...commonProps} onClick={() => handleStatusChange(round.id, 'SERVED')}>ເສີບແລ້ວ</Button>
            }
        }
        return null
    }

    const showCheckoutModal = () => {
        setSelectedPayment(PaymentOptions[0]?.value || null)
        setIsCheckoutModalVisible(true)
    }

    const handleCheckoutCancel = () => {
        setIsCheckoutModalVisible(false)
    }

    const handleConfirmCheckout = async () => {
        if (!selectedPayment) {
            message.warning("ກະລຸນາເລືອກວິທີການຊຳລະເງິນ.")
            return
        }
        if (!order || !order.id) {
            message.error("ບໍ່ພົບຂໍ້ມູນອໍເດີສຳລັບການຊຳລະເງິນ.")
            return
        }

        setCheckoutLoading(true)
        try {
            const response = await checkoutOrderApi(token, order.id, selectedPayment)
            if (response && response.data) {
                setOrder(response.data)
                setIsCheckoutModalVisible(false)
                message.success("ຊຳລະເງິນສຳເລັດ!")
            } else {
                message.error("ການຕອບກັບຈາກ Server ບໍ່ຖືກຕ້ອງຫຼັງຈາກຊຳລະເງິນ.")
            }
        } catch (err) {
            console.error("ຜິດພາດໃນການຊຳລະເງິນ:", err)
            message.error(`ຜິດພາດ: ${err.response?.data?.message || 'ການຊຳລະເງິນລົ້ມເຫລວ'}`)
        } finally {
            setCheckoutLoading(false)
        }
    }

    const renderOrderDetailsContent = () => {
        if (!order) return <Alert message="ບໍ່ພົບຂໍ້ມູນຄຳສັ່ງຊື້." type="warning" showIcon />

        return (
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className='flex flex-col gap-2'>
                        <h3 className="text-lg font-semibold text-gray-800">ຂໍ້ມູນຄຳສັ່ງຊື້ #{order.id}</h3>
                        <p className="text-gray-600 text-sm">ພະນັກງານ: {order.employee?.fname} {order.employee?.lname}</p>
                        <p className="text-gray-600 text-sm">ໂຕະ: {order.table?.table_number}</p>
                        <p className="text-gray-600 text-sm">
                            ສະຖານະບິນ: <Tag color={getStatusColor(order.billStatus)}>{getStatusLabel(order.billStatus)}</Tag>
                        </p>
                        {order.payment_method && (
                            <p className="text-gray-600 text-sm">
                                ວິທີຊຳລະ: <Tag color={getStatusColor(order.payment_method)}>{getStatusLabel(order.payment_method)}</Tag>
                            </p>
                        )}
                        <p className='text-xl font-bold text-green-600'>ລາຄາລວມ: {order.total_price?.toLocaleString()} ກີບ</p>
                        {order.billStatus === 'OPEN' && (user?.role === 'Cashier' || user?.role === 'Manager' || user?.role === 'Owner') && (
                            <Button
                                type="primary"
                                icon={<FaMoneyBillWave className="mr-2" />}
                                style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
                                className="hover:bg-green-700"
                                onClick={showCheckoutModal}
                                loading={checkoutLoading}
                            >
                                ຊຳລະເງິນ
                            </Button>
                        )}
                    </div>
                </div>

                {order.orderRounds?.length > 0 ? (
                    order.orderRounds.map((round) => (
                        <div key={round.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-semibold text-gray-700">
                                        ຮອບທີ {round.roundNumber}
                                        <span className="text-xs text-gray-500 ml-2">
                                            ({new Date(round.createdAt).toLocaleTimeString('lo-LA', { hour: '2-digit', minute: '2-digit' })})
                                        </span>
                                    </h3>
                                    <Space>
                                        <Tag color={getStatusColor(round.kitchenStatus)}>
                                            {getStatusLabel(round.kitchenStatus)}
                                        </Tag>
                                        {renderStatusButton(round)}
                                    </Space>
                                </div>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={round.orderDetails}
                                rowKey={(record, index) => `detail-${round.id}-${record.id || index}-${record.foodId || record.drinkId}`}
                                bordered
                                pagination={false}
                                size="small"
                                scroll={{ x: 'max-content' }}
                            />
                        </div>
                    ))
                ) : (
                    <Alert message="ບໍ່ມີລາຍການໃນອໍເດີນີ້." type="info" showIcon className="mt-4" />
                )}
            </div>
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
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍລະອຽດຄຳສັ່ງຊື້ #{orderId}</h2>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium text-start flex-[1]'></h2>
                </div>
                <div className='bg-white rounded p-2 md:p-4 lg:p-4'>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spin size="large" tip="ກຳລັງໂຫລດ..." />
                        </div>
                    ) : error ? (
                        <Alert message="ເກີດຂໍ້ຜິດພາດ" description={error} type="error" showIcon />
                    ) : (
                        renderOrderDetailsContent()
                    )}
                </div>
            </div>

            <Modal
                title={`ຊຳລະເງິນສຳລັບອໍເດີ #${order?.id}`}
                open={isCheckoutModalVisible}
                onOk={handleConfirmCheckout}
                onCancel={handleCheckoutCancel}
                confirmLoading={checkoutLoading}
                okText="ຢືນຢັນການຊຳລະ"
                cancelText="ຍົກເລີກ"
                centered
            >
                <p className="mb-2">ກະລຸນາເລືອກວິທີການຊຳລະເງິນ:</p>
                <Select
                    placeholder="ເລືອກວິທີຊຳລະ"
                    style={{ width: '100%', marginBottom: 16 }}
                    onChange={(value) => setSelectedPayment(value)}
                    value={selectedPayment}
                    options={PaymentOptions}
                />
                <p className='mt-4 text-base font-semibold'>ຍອດທີ່ຕ້ອງຊຳລະ: <strong className="text-green-600">{order?.total_price?.toLocaleString()} ກີບ</strong></p>
            </Modal>
        </Navbar>
    )
}

export default OrderDetail 