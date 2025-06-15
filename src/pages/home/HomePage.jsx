import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { IoMdCart } from 'react-icons/io';
import useSafezoneStore from '../../store/safezoneStore';
import { Skeleton, Empty } from 'antd';
import dayjs from 'dayjs';

function HomePage() {
    const [isSelected, setIsSelected] = useState('ທັງໝົດ');
    const [isLoading, setIsLoading] = useState(true);

    const {
        categories,
        food,
        drink,
        listCategory,
        listFood,
        listDrink,
        actionAddToCart
    } = useSafezoneStore();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await listCategory();
                await listFood();
                await listDrink();
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [listCategory, listFood, listDrink]);

    return (
        <Navbar>
            <div className='px-2 md:px-10 lg:px-10'>
                <ul className="flex gap-2 overflow-x-auto whitespace-nowrap my-4 scrollbar-hide">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <li key={index} className='w-[120px] min-w-[120px]'>
                                <Skeleton.Button active={true} size="small" shape="round" block={true} />
                            </li>
                        ))
                    ) : categories.length > 0 ? (
                        <>
                            <li
                                onClick={() => setIsSelected('ທັງໝົດ')}
                                className={`bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center
                                ${isSelected === 'ທັງໝົດ' ? 'bg-red-600' : ''}`}
                            >
                                ທັງໝົດ
                            </li>
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    onClick={() => setIsSelected(category.id)}
                                    className={`bg-red-500 px-2 md:px-3 active:bg-red-600 cursor-pointer text-white text-[12px] md:text-[14px] w-[80px] md:w-[100px] h-[24px] md:h-[28px] rounded-[2px] flex items-center justify-center
                                    ${isSelected === category.id ? 'bg-red-600' : ''}`}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </>
                    ) : null}
                </ul>

                <div className='bg-white p-2 sm:p-4 md:p-4 lg:p-4 h-full rounded'>
                    {isLoading ? (
                        <ul className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3'>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <li key={index} className='p-[2px] md:p-[3px] border w-full rounded border-red-400 shadow-md flex flex-col'>
                                    <Skeleton.Image active={true} style={{ width: '100%', height: '120px' }} />
                                    <div className='mt-2 w-full'>
                                        <Skeleton active={true} paragraph={{ rows: 2 }} title={false} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3'>
                            {(food || []).map(f => ({ ...f, type: 'food' }))
                                .concat((drink || []).map(d => ({ ...d, type: 'drink' })))
                                .filter(item => isSelected === 'ທັງໝົດ' || item.categoryId === isSelected)
                                .map((item) => (
                                    <li key={item.id} className='p-[2px] md:p-[3px] border w-full rounded border-red-400 shadow-md flex flex-col'>
                                        <div className='w-full h-[80px] md:h-[100px] lg:h-[120px] border border-gray-200 rounded'>
                                            <img src={item.imageUrl}
                                                className='w-full h-[80px] md:h-[100px] lg:h-[120px] object-cover rounded'
                                                alt={item.name} />
                                        </div>
                                        <div className='mt-2 w-full flex flex-col h-full'>
                                            <div className='flex-1'>
                                                <div className='flex items-center justify-between'>
                                                    <p className='px-1 text-[10px] md:text-[12px] lg:text-[14px] truncate'>{item.name}</p>
                                                    {item.type === 'drink' && (
                                                        <p className='text-[10px] text-gray-500'>
                                                            ຄ້າງ: {item.qty || 0}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className='text-[10px] md:text-[12px] lg:text-[14px] text-green-500 font-medium'>
                                                    {item.price.toLocaleString()} KIP
                                                </p>
                                            </div>
                                            <div className='flex items-end justify-between p-1'>
                                                <span className='text-[10px] text-gray-500'>
                                                    {dayjs(item.createdAt).format('DD-MM-YYYY')}
                                                </span>
                                                <div
                                                    onClick={() => actionAddToCart(item)}
                                                    className='w-[16px] h-[16px] cursor-pointer md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] bg-red-500 flex items-center justify-center rounded-[2px] text-white'>
                                                    <IoMdCart className='text-[14px] md:text-[16px] lg:text-[18px]' />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            {!isLoading && (!food?.length && !drink?.length) && (
                                <div className="col-span-full w-full py-8">
                                    <Empty description="ບໍ່ມີຂໍ້ມູນ" />
                                </div>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </Navbar>
    )
}

export default HomePage;