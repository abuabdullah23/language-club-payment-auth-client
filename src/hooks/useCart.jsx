import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            return res.data;
        }
    })
    return [cart, refetch];
};

export default useCart;