import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleClassCard from '../../components/SingleClassCard/SingleClassCard';

const Classes = () => {

    // fetch data with axios
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [] , refetch } = useQuery([''], async () => {
        const res = await axiosSecure.get('/classes/user')
        return res.data;
    })

    // filter only approved class from db
    const approvedClass = classes.filter(approved => approved.status === 'Approved')

    // console.log(approvedClass)

    return (
        <div className='mt-16'>
            <SectionTitle
                heading={'Classes'}
            ></SectionTitle>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
                {
                    approvedClass.map(classItem => <SingleClassCard
                        key={classItem._id}
                        classItem={classItem}
                    ></SingleClassCard>
                    )
                }
            </div>
        </div>
    );
};

export default Classes;