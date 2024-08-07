import {apiSlice} from "@/redux/api/apiSlice.ts";
import {ORDERS_URL} from "@/utils/constants.ts";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (_result, _error, orderId) => [
                {type: "Order", id: orderId},
            ],
        }),
        processOrder: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (_result, _error, orderId) => [
                {type: "Order", id: orderId},
            ],
        }),
        getMostRecentOrder: builder.query({
            query: () => 'orders/recent',
            providesTags: ['Order'],
        }),
    })
})

export const {
    useGetAllOrdersQuery,
    useProcessOrderQuery,
    useGetMostRecentOrderQuery,
} = orderApiSlice
