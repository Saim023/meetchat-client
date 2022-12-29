import React from 'react';

const About = () => {
    return (
        <div>
            <div className='grid grid-cols-1 gap-6 justify-items-center items-center content-center mt-16 mb-16'>
                <div className="card w-3/5 glass">
                    <div className="card-body">
                        <div className='text-white'>
                            <div className='flex justify-between'>
                                <h1 className="card-title text-color text-5xl font-bold">ABOUT ME</h1>
                                <button className="btn btn-accent common-button bg-transparent">EDIT</button>
                            </div>
                            <p>Hello! I’m Md. Saim Hossain. I'm Junior Web Developer with over 1 year of experience. I have depth knowledge of  HTML5, CSS3, JavaScript, React JS, Angular JS, Bootstrap5, Tailwind, MongoDB, Firebase and so on.</p>
                            <ul className='mt-6 text-2xl'>
                                <li>
                                    <span className='about-color'>NAME: </span>
                                    Md. Saim Hossain
                                </li>
                                <li>
                                    <span className='about-color'>UNIVERSITY: </span>
                                    Varendra University, Rajshahi, Bangladesh
                                </li>
                                <li>
                                    <span className='about-color'>ADDRESS: </span>
                                    Natore, Rajshahi, Bangladesh
                                </li>
                                <li>
                                    <span className='about-color'>E-MAIL: </span>
                                    saimhossain023@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;