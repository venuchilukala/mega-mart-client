import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useProduct = () => {
    const axiosPublic = useAxiosPublic()
    const {data : product = [], isPending : loading, refetch} = useQuery({
        queryKey : ['menu'],
        queryFn : async () => {
            const res = await axiosPublic.get('/products')
            return res.data
        }
    })

  return [product, refetch, loading]
}

export default useProduct
