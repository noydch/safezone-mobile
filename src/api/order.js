import axios from "axios"
import ApiPath from "./apiPath"

export const createOrderApi = async (token, data) => {
    return axios.post(ApiPath.createOrder, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateOrderApi = async (token, id, data) => {
    return axios.put(`${ApiPath.getOrderById}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getOrderByIdApi = async (token, id) => {
    return axios.get(`${ApiPath.getOrderById}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateRoundStatusApi = async (token, roundId, newStatus) => {
    return axios.put(`${ApiPath.updateRoundStatus}/${roundId}`, { status: newStatus }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const checkoutOrderApi = async (token, orderId, paymentMethod) => {
    return axios.put(`${ApiPath.checkOutOrder}/${orderId}`, { payment_method: paymentMethod }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// (แนะนำ) อาจจะเพิ่มฟังก์ชันสำหรับดึง Order ทั้งหมดด้วย
export const getAllOrdersApi = async (token) => {
    return axios.get(ApiPath.getOrders, { // สมมติว่ามี Path นี้
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};