import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, message, Spin, Radio } from 'antd';
import axios from 'axios';
import ApiPath from '../../api/apiPath';
import moment from 'moment';
import Navbar from '../../components/navbar/Navbar';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router';

const { Option } = Select;

const AddBooking = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState([]);
    const [tables, setTables] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [loadingTables, setLoadingTables] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isNewCustomer, setIsNewCustomer] = useState(false);

    useEffect(() => {
        if (!isNewCustomer) {
            fetchCustomers();
        }
        fetchTables();
    }, []);

    const fetchCustomers = async () => {
        setLoadingCustomers(true);
        try {
            const response = await axios.get(ApiPath.getCustomers);
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
            message.error('ບໍ່ສາມາດໂຫຼດຂໍ້ມູນລູກຄ້າໄດ້');
        } finally {
            setLoadingCustomers(false);
        }
    };

    const fetchTables = async () => {
        setLoadingTables(true);
        try {
            const response = await axios.get(ApiPath.getTable);
            setTables(response.data.filter(table => table.status === 'ວ່າງ'));
        } catch (error) {
            console.error("Error fetching tables:", error);
            message.error('ບໍ່ສາມາດໂຫຼດຂໍ້ມູນໂຕະໄດ້');
        } finally {
            setLoadingTables(false);
        }
    };

    const handleCustomerToggleChange = (e) => {
        const newIsNewCustomer = e.target.value;
        setIsNewCustomer(newIsNewCustomer);
        form.setFieldsValue({
            customerId: undefined,
            fname: undefined,
            lname: undefined,
            phone: undefined
        });
        if (!newIsNewCustomer && customers.length === 0) {
            fetchCustomers();
        }
    };

    const handleSubmit = async (values) => {
        setSubmitting(true);
        let customerIdToUse = values.customerId;

        try {
            if (isNewCustomer) {
                const newCustomerPayload = {
                    fname: values.fname,
                    lname: values.lname,
                    phone: values.phone,
                };
                try {
                    const customerResponse = await axios.post(ApiPath.createCustomer, newCustomerPayload);
                    customerIdToUse = customerResponse.data.id;
                } catch (customerError) {
                    if (customerError.response?.status === 409) {
                        message.error('ເບີໂທນີ້ມີລູກຄ້າຢູ່ແລ້ວ.');
                    } else {
                        message.error('ເກີດຂໍ້ຜິດພາດໃນການສ້າງລູກຄ້າ');
                    }
                    setSubmitting(false);
                    return;
                }
            }

            if (!customerIdToUse) {
                message.error('ກະລຸນາເລືອກ ຫຼື ເພີ່ມລູກຄ້າກ່ອນ.');
                setSubmitting(false);
                return;
            }

            const reservationPayload = {
                customerId: customerIdToUse,
                tableId: values.tableId,
                reservationTime: moment(values.reservationTime).toISOString(),
            };

            await axios.post(ApiPath.createReservation, reservationPayload);
            message.success('ສ້າງການຈອງສຳເລັດ!');
            navigate('/booking');

        } catch (error) {
            message.error('ເກີດຂໍ້ຜິດພາດໃນການສ້າງການຈອງ');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Navbar>
            <div className='px-2 md:px-10 lg:px-10'>
                <div className='my-2 flex items-center justify-between'>
                    <div onClick={() => navigate(-1)}
                        className='flex items-center gap-x-1 flex-[1] cursor-pointer'>
                        <MdArrowBackIos className='text-[14px] md:text-[16px] lg:text-[18px]' />
                        <span className='text-[12px] md:text-[14px] lg:text-[16px]'>ກັບຄືນ</span>
                    </div>
                    <h2 className='text-[16px] md:text-[18px] lg:text-[20px] font-medium flex-[1] text-center'>ເພີ່ມລາຍການຈອງ</h2>
                    <div className='flex-[1]'></div>
                </div>
                <div className='bg-white rounded p-2 md:p-4 lg:p-4'>
                    <Spin spinning={loadingCustomers || loadingTables || submitting}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            name="bookingForm"
                            className="max-w-[600px] mx-auto"
                        >
                            <Form.Item label="ເລືອກ ຫຼື ເພີ່ມລູກຄ້າ">
                                <Radio.Group onChange={handleCustomerToggleChange} value={isNewCustomer}>
                                    <Radio value={false}>ເລືອກລູກຄ້າ</Radio>
                                    <Radio value={true}>ເພີ່ມລູກຄ້າໃໝ່</Radio>
                                </Radio.Group>
                            </Form.Item>

                            {!isNewCustomer ? (
                                <Form.Item
                                    name="customerId"
                                    label="ເລືອກລູກຄ້າ"
                                    rules={[{ required: !isNewCustomer, message: 'ກະລຸນາເລືອກລູກຄ້າ' }]}
                                >
                                    <Select
                                        placeholder="ເລືອກລູກຄ້າ"
                                        loading={loadingCustomers}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {customers.map(customer => (
                                            <Option key={customer.id} value={customer.id}>
                                                {`${customer.fname} ${customer.lname} (${customer.phone})`}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            ) : (
                                <>
                                    <Form.Item
                                        name="fname"
                                        label="ຊື່ແທ້"
                                        rules={[{ required: isNewCustomer, message: 'ກະລຸນາປ້ອນຊື່ແທ້' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="lname"
                                        label="ນາມສະກຸນ"
                                        rules={[{ required: isNewCustomer, message: 'ກະລຸນາປ້ອນນາມສະກຸນ' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="phone"
                                        label="ເບີໂທ"
                                        rules={[{ required: isNewCustomer, message: 'ກະລຸນາປ້ອນເບີໂທ' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </>
                            )}

                            <Form.Item
                                name="tableId"
                                label="ເລືອກໂຕະ (ທີ່ວ່າງ)"
                                rules={[{ required: true, message: 'ກະລຸນາເລືອກໂຕະ' }]}
                            >
                                <Select placeholder="ເລືອກໂຕະ" loading={loadingTables}>
                                    {tables.map(table => (
                                        <Option key={table.id} value={table.id}>
                                            {`ໂຕະ ${table.table_number} (ບ່ອນນັ່ງ: ${table.seat})`}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="reservationTime"
                                label="ວັນທີ ແລະ ເວລາຈອງ"
                                rules={[{ required: true, message: 'ກະລຸນາເລືອກວັນທີ ແລະ ເວລາຈອງ' }]}
                            >
                                <DatePicker
                                    showTime
                                    format="DD/MM/YYYY HH:mm"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item>
                                <button
                                    type="submit"
                                    className='w-full h-[40px] font-medium text-[14px] rounded bg-red-500 text-center text-white border-2 border-transparent hover:border-2 hover:bg-transparent hover:border-red-500 hover:text-red-500 duration-300 cursor-pointer'
                                >
                                    ບັນທຶກ
                                </button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </div>
        </Navbar>
    );
};

export default AddBooking; 