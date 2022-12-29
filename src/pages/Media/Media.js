import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


const Media = () => {
    const { user } = useContext(AuthContext);
    const [like, setLike] = useState(0);
    const [likeActive, setLikeActive] = useState(false);

    const { data: allPosts = [], refetch, isLoading } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allPosts')
            const data = await res.json()
            return data
        }

    });

    console.log(allPosts);

    const likePost = (id) => {
        if (likeActive && id === allPosts._id) {
            setLikeActive(false);
        }
        else {
            setLikeActive(true);
            setLike(like + 1)
        }
    }

    return (
        <div className='text-white mt-12'>
            {
                allPosts && allPosts.map(post => <div key={post._id}>
                    <div className='grid grid-cols-1 gap-6 justify-items-center items-center content-center mb-16'>
                        <div className="card w-2/5 glass">
                            <figure><img src={post?.image} alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Motto</h2>
                                <p>{post?.text}</p>
                                <span><HandThumbUpIcon onClick={() => likePost(post._id)} className="h-6 mt-3 mb-3 w-6 text-primary" />Likes {like}</span>
                                <span></span>
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
    );
};

export default Media;