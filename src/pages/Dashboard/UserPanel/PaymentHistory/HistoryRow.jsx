import moment from 'moment/moment';
import React from 'react';

const HistoryRow = ({ row, index }) => {
    const { _id, name, image, email, price, date, transactionId, itemId, status
    } = row;

    return (
        <tr className='shadow-sm bg-neutral-100 hover:bg-[#ececec] hover:border-[#009620]'>
            <td className='font-bold text-xl'>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className='avatar border rounded-md p-1 bg-neutral-50'>
                        <div className="rounded-md w-20 h-14">
                            {image && <img src={image} />}
                        </div>
                    </div>
                </div>
            </td>
            <td className='text-slate-700'>
                <p className='font-semibold'>User Name: {name}</p>
                <p>User Email: {email}</p>
            </td>
            <td className='text-slate-700'>${price}</td>

            <td className='text-slate-700'>
                <p className='text-black'>{moment(date).format("dddd, MMMM D, YYYY, h:mm:ss A")}</p>
                <hr className='my-1' />
                <p className='font-semibold my-1'>TrID: {transactionId}</p>
                <p>Item Id: {itemId}</p>
            </td>

            <td className={status === 'Pending'
                ? 'text-base font-semibold text-[#ff9100]'
                : 'text-base font-semibold text-green-600'}>{status}</td>

        </tr >
    );
};

export default HistoryRow;