import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import SingleClassCard from '../../../components/SingleClassCard/SingleClassCard';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SubmitButton from '../../../components/Buttons/SubmitButton';

const PopularClasses = () => {
    const [axiosSecure] = useAxiosSecure();

    // fetch data with axios
    const { data: classes = [], refetch } = useQuery([''], async () => {
        const res = await axiosSecure.get('/classes/popular')
        return res.data;
    })
    return (
        <div className='mt-16 lg:w-5/6 mx-auto'>
            <SectionTitle
                heading={'Popular Classes'}
            ></SectionTitle>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
                {
                    classes.slice(0, 6).map(classItem => <SingleClassCard
                        key={classItem._id}
                        classItem={classItem}
                    ></SingleClassCard>
                    )
                }
            </div>

            {
                classes.length > 6 ?
                    <Link to='/classes'>
                        <SubmitButton
                            buttonText={'Show All Classes'}
                        ></SubmitButton>
                    </Link>
                    :
                    <></>
            }
        </div>
    );
};

export default PopularClasses;