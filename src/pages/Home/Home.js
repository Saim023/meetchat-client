import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbbKey;

    const { data: topPosts = [], refetch, isLoading } = useQuery({
        queryKey: ['topPosts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/topPosts')
            const data = await res.json()
            return data
        }

    });

    console.log(topPosts)

    const handlePost = (data) => {
        console.log(data.image[0]);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)

                    const posts = {
                        text: data.text,
                        image: imgData.data.url
                    }

                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',

                        },
                        body: JSON.stringify(posts)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Posted successfully!!');
                            navigate('/media')
                        })

                }
            })



    }

    return (
        <div className='grid grid-cols1 md:grid-cols-6 lg:grid-cols-12 text-white mt-12'>
            <div className='col-span-3'>
                <div className="px-8">
                    <form onSubmit={handleSubmit(handlePost)}>
                        <textarea id='text' {...register("text")} className="textarea textarea-accent bg-transparent mb-4 w-full" placeholder="Put your thought"></textarea>
                        <input id='image' type="file"  {...register("image")} className="file-input file-input-bordered file-input-accent bg-transparent mb-4 w-full" />
                        <button className="btn btn-outline btn-accent mb-4 w-full" type="submit">SUBMIT</button>
                    </form>
                </div>
            </div>
            <div className='col-span-6 px-8'>
                <h1 className='about-color mb-8 text-center'>TOP POSTS</h1>

                <div className='text-white'>
                    {
                        topPosts && topPosts.map(top => <div key={top._id}>
                            <div className='grid grid-cols-1 gap-6 justify-items-center items-center content-center mb-16'>
                                <div className="card w-full glass">
                                    <figure><img src={top?.image} alt="car!" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Motto</h2>
                                        <p>{top?.text}</p>

                                        <span><HandThumbUpIcon className="h-6 mt-3 mb-3 w-6 text-primary" /><span className='likes-color text-md'>Likes: </span> {top.likes}</span>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-accent common-button bg-transparent">DETAILS</button>
                                        </div>
                                        <textarea id='comment' className="textarea mt-8 textarea-accent bg-transparent w-full" placeholder="Add Your Comment"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <div className='col-span-3 px-8'>
                <h1 className='about-color font-xl text-center'>Active Users</h1>
            </div>
        </div>
    );
};

export default Home;