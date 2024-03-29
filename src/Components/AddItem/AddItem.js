import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItem = ({refetch}) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const name = data.name;
        const description = data.description;
        const availableQuantity = parseFloat(data.availableQuantity);
        const price = parseFloat(data.price);
        const img = data.img;
        const mustQuantity = parseFloat(data.mustQuantity);
        // console.log(typeof mustQuantity)

        const formData = new FormData();
        const imgFile = img[0];
        formData.append('image', imgFile);

        const imgUrlKey = 'de8d5cbef5537b13801ca237aa9673ae';
        await fetch(`https://api.imgbb.com/1/upload?key=${imgUrlKey}`, {
            method: "POST", // or 'PUT',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                const photoUrl = data.data.display_url;
                console.log(photoUrl);
                const addItemDetails = {
                    name,
                    description,
                    availableQuantity,
                    price,
                    photoUrl,
                    mustQuantity
                }

                fetch(`https://trs-project-server-side-main.vercel.app/addItem`, {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(addItemDetails),
                })
                    .then(res => res.json())
                    .then(data => {
                        reset();
                        refetch();
                        toast.success("Add Item success");
                    });
            });
        
        
    };

    return (
        <div className='w-full	my-5'>
            <h1 className='text-3xl text-purple-400 text-center my-5'>You can add a item</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-9/12 lg:w-5/12 mx-auto flex flex-col gap-4'>

                <input
                    placeholder="Enter Name" className="input input-bordered "
                    {...register("name", { required: "Name is required" })}
                    aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p role="alert">{errors.name?.message}</p>}

                <input
                    placeholder="Enter Description" className="input input-bordered "
                    {...register("description", { required: "Description is required" })}
                    aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description && <p role="alert">{errors.description?.message}</p>}

                <input
                    placeholder="Enter quantity" className="input input-bordered "
                    type="number"
                    {...register("availableQuantity", { required: "Quantity is required" })}
                    aria-invalid={errors.availableQuantity ? "true" : "false"}
                />
                {errors.availableQuantity && <p role="alert">{errors.availableQuantity?.message}</p>}

                <input
                    placeholder="Enter must take quantity" className="input input-bordered "
                    type="number"
                    {...register("mustQuantity", { required: "Must quantity is required" })}
                    aria-invalid={errors.mustQuantity ? "true" : "false"}
                />
                {errors.mustQuantity && <p role="alert">{errors.mustQuantity?.message}</p>}

                <input
                    placeholder="Enter Price" className="input input-bordered "
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    aria-invalid={errors.price ? "true" : "false"}
                />
                {errors.price && <p role="alert">{errors.price?.message}</p>}

                <input
                    type="file" placeholder="" className="file-input file-input-accent  file-input-bordered w-full"
                    {...register("img", { required: "Image is required" })}
                    aria-invalid={errors.img ? "true" : "false"}
                />
                {errors.img && <p role="alert">{errors.img?.message}</p>}

                <input className='btn btn-outline w-full' type="submit" value='ADD ITEM' />
            </form>
        </div>
    );
};

export default AddItem;