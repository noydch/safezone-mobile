import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Table, Tag, Spin, Alert, Space, Button, message } from 'antd'
import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate } from 'react-router'
import axios from 'axios'
import ApiPath from '../../api/apiPath'
import moment from 'moment'

const Booking = () => {
    const navigate = useNavigate()
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updatingStatus, setUpdatingStatus] = useState({})

    useEffect(() => {
        fetchReservations()
    }, [])

    const fetchReservations = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(ApiPath.getReservations)
            const formattedData = response.data.map(res => ({
                key: res.id,
                id: res.id,
                datetime: moment(res.reservationTime).format('DD/MM/YYYY HH:mm'),
                tableNo: res.table ? `No.${res.table.table_number}` : 'N/A',
                status: res.status,
                customer: res.customer ? `${res.customer.fname} ${res.customer.lname}` : 'N/A',
                phone: res.customer ? res.customer.phone : 'N/A',
                _reservationTime: res.reservationTime
            }))
            setReservations(formattedData)
        } catch (err) {
            console.error("Error fetching reservations:", err)
            setError('Failed to load reservations. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (reservationId, newStatus) => {
        const loadingKey = `${reservationId}_${newStatus}`
        setUpdatingStatus(prev => ({ ...prev, [loadingKey]: true }))

        try {
            await axios.put(`${ApiPath.updateReservationStatus}/${reservationId}`, {
                status: newStatus
            })
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation.id === reservationId
                        ? { ...reservation, status: newStatus }
                        : reservation
                )
            )
            message.success(`ອັບເດດສະຖານະການຈອງເປັນ ${newStatus}`)
        } catch (err) {
            console.error("Error updating reservation status:", err)
            message.error('ການອັບເດດສະຖານະລົ້ມເຫລວ.')
        } finally {
            setUpdatingStatus(prev => ({ ...prev, [loadingKey]: false }))
        }
    }

    const handleDeleteReservation = async (reservationId) => {
        const loadingKey = `${reservationId}_delete`
        setUpdatingStatus(prev => ({ ...prev, [loadingKey]: true }))

        try {
            await axios.delete(`${ApiPath.deleteReservation}/${reservationId}`)
            setReservations(prevReservations =>
                prevReservations.filter(reservation => reservation.id !== reservationId)
            )
            message.success('ລົບການຈອງສຳເລັດແລ້ວ')
        } catch (err) {
            console.error("Error deleting reservation:", err)
            message.error('ການລົບການຈອງລົ້ມເຫລວ.')
        } finally {
            setUpdatingStatus(prev => ({ ...prev, [loadingKey]: false }))
        }
    }

    const columns = [
        {
            title: 'ລຳດັບ',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'ວັນທີ ແລະ ເວລາ',
            dataIndex: 'datetime',
            key: 'datetime',
            width: '20%',
            sorter: (a, b) => moment(a._reservationTime).valueOf() - moment(b._reservationTime).valueOf(),
        },
        {
            title: 'ເລກໂຕະ',
            dataIndex: 'tableNo',
            key: 'tableNo',
            width: '10%',
        },
        {
            title: 'ສະຖານະ',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (status) => {
                let color = 'default'
                switch (status) {
                    case 'confirmed':
                        color = 'success'
                        break
                    case 'pending':
                        color = 'warning'
                        break
                    case 'cancelled':
                        color = 'error'
                        break
                }
                return <Tag color={color}>{String(status).toUpperCase()}</Tag>
            },
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Confirmed', value: 'confirmed' },
                { text: 'Cancelled', value: 'cancelled' },
            ],
            onFilter: (value, record) => record.status.indexOf(String(value)) === 0,
        },
        {
            title: 'ຊື່ລູກຄ້າ',
            dataIndex: 'customer',
            key: 'customer',
            width: '20%',
        },
        {
            title: 'ເບີ',
            dataIndex: 'phone',
            key: 'phone',
            width: '15%',
        },
        {
            title: 'ຈັດການ',
            key: 'action',
            width: '15%',
            render: (_, record) => (
                <Space>
                    {record.status === 'pending' ? (
                        <>
                            <Button
                                type="primary"
                                size="small"
                                loading={updatingStatus[`${record.id}_confirmed`]}
                                onClick={() => handleStatusChange(record.id, 'confirmed')}
                            >
                                ຄອນເຟີມ
                            </Button>
                            <Button
                                danger
                                size="small"
                                loading={updatingStatus[`${record.id}_cancelled`]}
                                onClick={() => handleStatusChange(record.id, 'cancelled')}
                            >
                                ຍົກເລຶກ
                            </Button>
                        </>
                    ) : (
                        <Button
                            danger
                            size="small"
                            loading={updatingStatus[`${record.id}_delete`]}
                            onClick={() => handleDeleteReservation(record.id)}
                        >
                            ລົບ
                        </Button>
                    )}
                </Space>
            ),
        },
    ]

    return (
        <Navbar>
            <div className='px-2 md:px-10 lg:px-10'>
                <div className='my-2 flex items-center justify-between'>
                    <div onClick={() => navigate(-1)}
                        className='flex items-center gap-x-1 flex-[1] cursor-pointer'>
                        <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                        <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                    </div>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ລາຍການຈອງ</h2>
                    <button
                        onClick={() => navigate('/booking/add')}
                        className='h-[30px] w-[80px] flex-[1] font-medium text-[12px] rounded bg-red-500 text-center text-white border-2 border-transparent hover:border-2 hover:bg-transparent hover:border-red-500 hover:text-red-500 duration-300 cursor-pointer'>
                        ເພີ່ມລາຍການຈອງ
                    </button>
                </div>
                <div className='bg-white rounded p-2 md:p-4 lg:p-4 h-screen'>
                    {loading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <Spin size="large" />
                        </div>
                    ) : error ? (
                        <Alert message="Error" description={error} type="error" showIcon />
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={reservations}
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            className="text-[10px] md:text-[12px] lg:text-[14px] rounded"
                        />
                    )}
                </div>
            </div>
        </Navbar>
    )
}

export default Booking