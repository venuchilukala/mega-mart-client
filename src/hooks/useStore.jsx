import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useStore = () => {
    const axiosPublic = useAxiosPublic()
    const {data : store = [], isPending : loading, refetch} = useQuery({
        queryKey : ['store'],
        queryFn : async () => {
            const res = await axiosPublic.get('/stores')
            return res.data
        }
    })

  return [store, refetch, loading]
}

export default useStore
