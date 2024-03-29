import React from 'react';
import Loading from '../Loading/Loading';

const ManageItemsModel = ({isLoading, id, refetch }) => {
    const handleItemDelete = async (id) => {
        if (id) {
            await fetch(`https://trs-project-server-side-main.vercel.app/item/${id}`, {
                method: "DELETE", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            })
                .then(res => res.json())
                .then(data => {
                })
                refetch();
        }
    }

    return (
        <>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer sm:modal-middle">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">You really want to delete this product?</h3>
                    <div className="modal-action">
                        <label htmlFor="my-modal-4" className='btn' onClick={() => handleItemDelete(id)}>Remove Item</label>
                    </div>
                </label>
            </label>
        </>
    );
};

export default ManageItemsModel;