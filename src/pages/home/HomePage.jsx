import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { IoMdCart } from 'react-icons/io';

const foods = [
    {
        id: 1,
        name: "ເຂົ້າຜັດ",
        price: 40000,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "ຕຳຫມາກຫຸ່ງ",
        price: 35000,
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "ລາບຫມູ",
        price: 45000,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "ເຂົ້າຫມູກອບ",
        price: 50000,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        name: "ຂ້າວເຫຼົ້າ",
        price: 30000,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        name: "ຕົ້ມຍຳກຸ້ງ",
        price: 60000,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        name: "ຂົ້ວປາ",
        price: 40000,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        name: "ເຂົ້າຫມູທອດ",
        price: 45000,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 9,
        name: "ຂົ້ວຫມູ",
        price: 42000,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 10,
        name: "ຂົ້ວໄກ່",
        price: 42000,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 11,
        name: "ຂົ້ວກຸ້ງ",
        price: 48000,
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 12,
        name: "ຂົ້ວປູ",
        price: 48000,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 13,
        name: "ຂົ້ວປີ້ງ",
        price: 50000,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 14,
        name: "ຂົ້ວຫມູປີ້ງ",
        price: 52000,
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 15,
        name: "ຂົ້ວໄກ່ປີ້ງ",
        price: 52000,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 16,
        name: "ຂົ້ວກຸ້ງປີ້ງ",
        price: 55000,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80"
    }
];

function HomePage() {
    return (
        <Navbar>
            <div className=' px-2 md:px-10 lg:px-10'>
                <ul className="flex gap-2 overflow-x-auto whitespace-nowrap my-4 scrollbar-hide">
                    <li className='bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center'>
                        ປະເພດເຄື່ອງດື່ມ
                    </li>
                    <li className='bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center'>
                        ປະເພດເຄື່ອງດື່ມ
                    </li>
                    <li className='bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center'>
                        ປະເພດເຄື່ອງດື່ມ
                    </li>
                    <li className='bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center'>
                        ປະເພດເຄື່ອງດື່ມ
                    </li>
                    <li className='bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center'>
                        ປະເພດເຄື່ອງດື່ມ
                    </li>
                    <li className='bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center'>
                        ປະເພດເຄື່ອງດື່ມ
                    </li>
                </ul>
                <div className='bg-white p-2 sm:p-4 md:p-4 lg:p-4 h-full rounded'>
                    <ul className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3'>
                        {foods.map(food => (
                            <li key={food.id} className='p-[2px] md:p-[3px] border w-full rounded border-red-400 shadow-md flex flex-col'>
                                <div className='w-full h-[80px] md:h-[100px] lg:h-[120px] border border-gray-200 rounded'>
                                    <img src={food.image}
                                        className='w-full h-[80px] md:h-[100px] lg:h-[120px] object-cover rounded'
                                        alt={food.name} s />
                                </div>
                                <p className='px-1 text-[10px] md:text-[12px] lg:text-[14px] mt-1 truncate'>{food.name}</p>
                                <div className='flex items-end justify-between p-1'>
                                    <p className='text-[10px] md:text-[12px] lg:text-[14px] text-green-500 font-medium'>
                                        {food.price.toLocaleString()} KIP
                                    </p>
                                    <div className='w-[16px] h-[16px] cursor-pointer md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] bg-red-500 flex items-center justify-center rounded-[2px] text-white'>
                                        <IoMdCart className='text-[14px] md:text-[16px] lg:text-[18px]' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Navbar>
    )
}

export default HomePage; 