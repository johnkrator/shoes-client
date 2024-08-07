import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProcessOrderQuery } from '@/redux/api/orderApiSlice';
import Container from "@/Container";
import SuccessMessage from "@/pages/order/SuccessMessage";
import LazyImage from "@/components/LazyImage";
import { Separator } from "@/components/ui/separator";
import { GoChevronLeft } from "react-icons/go";
import TrackOrderProgressSteps from "@/components/TrackOrderProgressSteps";
import RevelOnScroll from "@/components/RevealOnScroll";
import {RootState} from "@/redux/store.ts";
import {SkeletonDemo} from "@/components/Loader.tsx";
import {OrderProduct} from "@/types/Product.ts";

const OrderDetails = () => {
    const { orderId } = useParams();
    const { userInfo } = useSelector((state:RootState) => state.auth);
    const { data: order, isLoading, error } = useProcessOrderQuery(orderId);

    if (isLoading) {
        return (
            <Container>
                <div className="my-10">
                    <SkeletonDemo/>
                </div>
            </Container>
        );
    }

    if (error) return (
        <Container>
            <p className='my-10'>An error occurred!</p>
        </Container>
    );

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <RevelOnScroll>
            <Container>
                <div className="flex flex-col gap-10 my-10">
                    <SuccessMessage />

                    {/* order reference */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between font-bold">
                            <p>Order: #{order._id}</p>
                            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-0 gap-5 justify-between p-5 bg-[#FEE8E1] dark:bg-gray-800">
                            <div>
                                <div className="flex flex-col">
                                    <h1 className="font-bold">Delivery Address</h1>
                                    <p className="font-bold text-sm">{userInfo.name}</p>
                                </div>
                                <div className="flex flex-col gap-11 mt-5 text-sm">
                                    <p>{order.deliveryAddress}</p>
                                    <p className="font-bold">{userInfo.phone}</p>
                                </div>
                            </div>

                            <div>
                                <h1 className="font-bold">Payment Method</h1>
                                <p>{order.paymentMethod}</p>
                            </div>

                            <div className="space-y-1 w-full max-w-md">
                                <h1 className="font-bold">Order Summary</h1>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm">Product Total</h4>
                                    <p className="text-xs">${order.totalAmount.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm">Shipping</h4>
                                    <p className="text-xs">$0.00</p>
                                </div>

                                <Separator className="my-2 text-gray-800"/>

                                <div className="flex items-center justify-between text-sm font-bold">
                                    <p>Subtotal</p>
                                    <p>${order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* order details */}
                    <div className="flex lg:flex-row flex-col gap-5">
                        <div className="flex flex-col">
                            <p className="font-bold">Order Details</p>
                            <div className="flex flex-col gap-2 lg:w-[60vw] bg-custom-brown-gradient text-white lg:p-10 p-5">
                                {order.products.map((item: OrderProduct, index: number) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <h4 className="font-bold">{item.productId.name}</h4>
                                        <div className="flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-2 justify-between">
                                            <div className="flex gap-3">
                                                <LazyImage
                                                    src={item.productId.images[0]}
                                                    alt={item.productId.name}
                                                    className="object-cover w-[134.51px] h-[140px]"
                                                />
                                                <div className="flex flex-col text-sm">
                                                    <p>Color: {item.productId.colors[0]}</p>
                                                    <p>Size: {item.productId.sizes[0]}</p>
                                                    <p>Item #: {item.productId._id}</p>
                                                    <div className="flex items-center gap-2">
                                                        <p>Quantity</p>
                                                        <span>{item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm">${(item.productId.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-[40vw]">
                            <p className="font-bold">Track Order</p>
                            <TrackOrderProgressSteps step1={true} step2={true} step3={false} step4={false} step5={false}/>
                            <div className="text-sm">
                                <p>Estimated day and time to be delivered</p>
                                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <Link className="flex items-center capitalize font-bold hover:underline" to="/shop">
                        <GoChevronLeft/>
                        Continue Shopping
                    </Link>
                </div>
            </Container>
        </RevelOnScroll>
    );
};

export default OrderDetails;



// import Container from "@/Container.tsx";
// import SuccessMessage from "@/pages/order/SuccessMessage.tsx";
// import paypal from "@/assets/paypal-svgrepo-com 1.png";
// import whiteSneakers from "@/assets/Rectangle 5721.png";
// import pinkSneakers from "@/assets/Rectangle 5722.png";
// import LazyImage from "@/components/LazyImage.tsx";
// import {Separator} from "@/components/ui/separator.tsx";
// import {GoChevronLeft} from "react-icons/go";
// import {Link} from "react-router-dom";
// import TrackOrderProgressSteps from "@/components/TrackOrderProgressSteps.tsx";
// import RevelOnScroll from "@/components/RevealOnScroll.tsx";
//
// const OrderDetails = () => {
//     return (
//         <RevelOnScroll>
//             <Container>
//                 <div className="flex flex-col gap-10 my-10">
//                     <SuccessMessage/>
//
//                     {/*order reference*/}
//                     <div className="flex flex-col gap-5">
//                         <div className="flex items-center justify-between font-bold">
//                             <p>Order: #23567890</p>
//                             <p>Order Date: 15/07/2024</p>
//                         </div>
//
//                         <div
//                             className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-0 gap-5 justify-between p-5 bg-[#FEE8E1] dark:bg-gray-800">
//                             <div>
//                                 <div className="flex flex-col">
//                                     <h1 className="font-bold">Delivery Address</h1>
//                                     <p className="font-bold text-sm">Elsbeth Jones</p>
//                                 </div>
//                                 <div className="flex flex-col gap-11 mt-5 text-sm">
//                                     <p>
//                                         Courts Complex, Ellet tower, Third floor <br/>
//                                         Apartment 14, Plot 22, Amani rd
//                                     </p>
//                                     <p className="font-bold">+234 775 123456</p>
//                                 </div>
//                             </div>
//
//                             <div>
//                                 <h1 className="font-bold">Payment Method</h1>
//                                 <LazyImage
//                                     src={paypal}
//                                     alt="paypal"
//                                     className="w-[94px] h-[72px] object-cover"
//                                 />
//                             </div>
//
//                             <div className="space-y-1 w-full max-w-md">
//                                 <h1 className="font-bold">Order Summary</h1>
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-sm">Product Total</h4>
//                                     <p className="text-xs">$335.00</p>
//                                 </div>
//
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-sm">Shipping Rush <br/>Sun July, 14th</h4>
//                                     <p className="text-xs">$30.00</p>
//                                 </div>
//
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-sm">You saved</h4>
//                                     <p className="text-xs">-$50.00</p>
//                                 </div>
//
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-sm">Sales tax</h4>
//                                     <p className="text-xs">TBD</p>
//                                 </div>
//
//                                 <Separator className="my-2 text-gray-800"/>
//
//                                 <div className="flex items-center justify-between text-sm font-bold">
//                                     <p>Subtotal</p>
//                                     <p>$365.00</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/*order details*/}
//                     <div className="flex lg:flex-row flex-col gap-5">
//                         <div className="flex flex-col">
//                             <p className="font-bold">Order Details</p>
//                             <div
//                                 className="flex flex-col gap-2 lg:w-[60vw] bg-custom-brown-gradient text-white lg:p-10 p-5">
//                                 <div className="flex flex-col gap-2">
//                                     <h4 className="font-bold">Men’s Merrell MQM 3 GORE-TEX</h4>
//                                     <div
//                                         className="flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-2 justify-between">
//                                         <div className="flex gap-3">
//                                             <LazyImage
//                                                 src={whiteSneakers}
//                                                 alt="white sneakers"
//                                                 className="object-cover w-[134.51px] h-[140px]"
//                                             />
//                                             <div className="flex flex-col text-sm">
//                                                 <p>Color: Seamoss/Granite</p>
//                                                 <p>Size: Burgundy + Rose / 35</p>
//                                                 <p>Item #: 195017986758</p>
//                                                 <div className="flex items-center gap-2">
//                                                     <p>Quantity</p>
//                                                     <span>1</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <p className="text-sm">$135.00</p>
//                                     </div>
//                                 </div>
//
//                                 <div className="flex flex-col gap-2">
//                                     <h4 className="font-bold">Men’s Merrell MQM 3 GORE-TEX</h4>
//                                     <div
//                                         className="flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-2 justify-between">
//                                         <div className="flex gap-3">
//                                             <LazyImage
//                                                 src={pinkSneakers}
//                                                 alt="pink sneakers"
//                                                 className="object-cover w-[134.51px] h-[140px]"
//                                             />
//                                             <div className="flex flex-col text-sm">
//                                                 <p>Color: Seamoss/Granite</p>
//                                                 <p>Size: Pebbled Ivory / 35</p>
//                                                 <p>Item #: 195017986123</p>
//                                                 <div className="flex items-center gap-2">
//                                                     <p>Quantity</p>
//                                                     <span>1</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <p className="text-sm">$200.00</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className="lg:w-[40vw]">
//                             <p className="font-bold">Track Order</p>
//                             <TrackOrderProgressSteps step1={true} step2={true} step3={false} step4={false}
//                                                      step5={false}/>
//                             <div className="text-sm">
//                                 <p>Estimated day and time to be delivered</p>
//                                 <p>19th July</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     <Link className="flex items-center capitalize font-bold hover:underline" to="/shop">
//                         <GoChevronLeft/>
//                         Continue Shopping
//                     </Link>
//                 </div>
//             </Container>
//         </RevelOnScroll>
//     );
// };
//
// export default OrderDetails;





// import React from 'react';
// import { useParams, Link } from "react-router-dom";
// import { toast } from 'react-toastify';
// import Container from "@/Container";
// import SuccessMessage from "@/pages/order/SuccessMessage";
// import LazyImage from "@/components/LazyImage";
// import { Separator } from "@/components/ui/separator";
// import { GoChevronLeft } from "react-icons/go";
// import TrackOrderProgressSteps from "@/components/TrackOrderProgressSteps";
// import RevelOnScroll from "@/components/RevealOnScroll";
// import {useGetAllOrdersQuery, useProcessOrderQuery} from "@/redux/api/orderApiSlice";
// import { SkeletonDemo } from "@/components/Loader";
// import { toastConfig } from "@/components/toastConfig.ts";
//
// interface ProductId {
//     _id: string;
//     name: string;
//     images: string[];
//     colors: string[];
//     sizes: string[];
//     discount_price?: number;
//     price: number;
// }
//
// interface OrderProduct {
//     productId: ProductId;
//     quantity: number;
// }
//
// interface Order {
//     _id: string;
//     createdAt: string;
//     userId: string;
//     deliveryAddress: string;
//     paymentMethod: string;
//     totalAmount: number;
//     voucherCode?: string;
//     products: OrderProduct[];
// }
//
// interface OrderData {
//     order: Order;
// }
//
// const OrderDetails: React.FC = () => {
//     const { orderId } = useParams<{ orderId?: string }>();
//
//     const { data: orderData, isLoading: isOrderLoading, error: orderError } = useProcessOrderQuery(orderId || "");
//     const { data: allOrdersData, isLoading: isAllOrdersLoading, error: allOrdersError } = useGetAllOrdersQuery({});
//
//     if (isOrderLoading || isAllOrdersLoading) {
//         return (
//             <Container>
//                 <div className="flex justify-center items-center h-screen">
//                     <SkeletonDemo />
//                 </div>
//             </Container>
//         );
//     }
//
//     if (orderError || allOrdersError) {
//         console.error("Error fetching order(s):", orderError || allOrdersError);
//         toast.error("Unable to load order details. Please try again later.", toastConfig);
//         return null;
//     }
//
//     if (!orderId) {
//         // Render order history
//         return (
//             <Container>
//                 <div className="my-10">
//                     <h1 className="text-2xl font-bold mb-5">Order History</h1>
//                     {allOrdersData && allOrdersData.orders.map((order: Order) => (
//                         <div key={order._id} className="mb-5 p-5 border rounded">
//                             <Link to={`/orders/${order._id}`} className="text-blue-600 hover:underline">
//                                 <h2 className="text-xl font-semibold">Order #{order._id}</h2>
//                             </Link>
//                             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                             <p>Total: ₦{order.totalAmount / 100}</p>
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         );
//     }
//
//     if (!orderData) {
//         console.log("No order data received");
//         toast.error("No order data available. Please try again later.", toastConfig);
//         return null;
//     }
//
//     const { order } = orderData as OrderData;
//
//     return (
//         <RevelOnScroll>
//             <Container>
//                 <div className="flex flex-col gap-10 my-10">
//                     <SuccessMessage />
//
//                     {/* Order reference */}
//                     <div className="flex flex-col gap-5">
//                         <div className="flex items-center justify-between font-bold">
//                             <p>Order: #{order._id}</p>
//                             <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                         </div>
//
//                         <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-0 gap-5 justify-between p-5 bg-[#FEE8E1]">
//                             <div>
//                                 <div className="flex flex-col">
//                                     <h1 className="font-bold">Delivery Address</h1>
//                                     <p className="font-bold text-sm">{order.userId}</p>
//                                 </div>
//                                 <div className="flex flex-col gap-11 mt-5 text-sm">
//                                     <p>{order.deliveryAddress}</p>
//                                 </div>
//                             </div>
//
//                             <div>
//                                 <h1 className="font-bold">Payment Method</h1>
//                                 <p>{order.paymentMethod}</p>
//                             </div>
//
//                             <div className="space-y-1 w-full max-w-md">
//                                 <h1 className="font-bold">Order Summary</h1>
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-sm">Total Amount</h4>
//                                     <p className="text-xs">₦{order.totalAmount / 100}</p>
//                                 </div>
//
//                                 {order.voucherCode && (
//                                     <div className="flex items-center justify-between">
//                                         <h4 className="text-sm">Voucher Applied</h4>
//                                         <p className="text-xs">{order.voucherCode}</p>
//                                     </div>
//                                 )}
//
//                                 <Separator className="my-2 text-gray-800"/>
//
//                                 <div className="flex items-center justify-between text-sm font-bold">
//                                     <p>Total</p>
//                                     <p>₦{order.totalAmount / 100}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Order details */}
//                     <div className="flex lg:flex-row flex-col gap-5">
//                         <div className="flex flex-col">
//                             <p className="font-bold">Order Details</p>
//                             <div className="flex flex-col gap-2 lg:w-[60vw] bg-custom-brown-gradient text-white lg:p-10 p-5">
//                                 {order.products.map((product: OrderProduct, index: number) => (
//                                     <div key={index} className="flex flex-col gap-2">
//                                         <h4 className="font-bold">{product.productId.name}</h4>
//                                         <div className="flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-2 justify-between">
//                                             <div className="flex gap-3">
//                                                 <LazyImage
//                                                     src={product.productId.images[0]}
//                                                     alt={product.productId.name}
//                                                     className="object-cover w-[134.51px] h-[140px]"
//                                                 />
//                                                 <div className="flex flex-col text-sm">
//                                                     <p>Color: {product.productId.colors.join(", ")}</p>
//                                                     <p>Size: {product.productId.sizes.join(", ")}</p>
//                                                     <p>Item #: {product.productId._id}</p>
//                                                     <div className="flex items-center gap-2">
//                                                         <p>Quantity</p>
//                                                         <span>{product.quantity}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <p className="text-sm">₦{(product.productId.discount_price || product.productId.price) * product.quantity}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         <div className="lg:w-[40vw]">
//                             <p className="font-bold">Track Order</p>
//                             <TrackOrderProgressSteps
//                                 step1={true}
//                                 step2={true}
//                                 step3={false}
//                                 step4={false}
//                                 step5={false}
//                             />
//                             <div className="text-sm">
//                                 <p>Estimated delivery</p>
//                                 <p>To be determined</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     <Link className="flex items-center capitalize font-bold hover:underline" to="/shop">
//                         <GoChevronLeft/>
//                         Continue Shopping
//                     </Link>
//                 </div>
//             </Container>
//         </RevelOnScroll>
//     );
// };
//
// export default OrderDetails;
