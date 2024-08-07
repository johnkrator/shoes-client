import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import ProgressSteps from "@/components/ProgressSteps.tsx";
import { Link, useParams } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import Container from "@/Container.tsx";
import SuccessMessage from "@/pages/order/SuccessMessage.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";
import { useGetMostRecentOrderQuery } from '@/redux/api/orderApiSlice';

interface PaymentSuccessConfettiProps {
    orderId?: string;
}

const PaymentSuccessConfetti: React.FC<PaymentSuccessConfettiProps> = ({ orderId }) => {
    const params = useParams<{ orderId: string }>();
    const [finalOrderId, setFinalOrderId] = useState<string | undefined>(orderId || params.orderId);
    const { data: recentOrder, isLoading } = useGetMostRecentOrderQuery({});

    useEffect(() => {
        // Trigger confetti effect when component mounts
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6}
        });

        // If we don't have an orderId prop or param, use the most recent order
        if (!finalOrderId && recentOrder && recentOrder._id) {
            setFinalOrderId(recentOrder._id);
        }
    }, [finalOrderId, recentOrder]);

    return (
        <RevelOnScroll>
            <Container>
                <ProgressSteps step1={true} step2={true} step3={true}/>
                <div className="flex flex-col items-center justify-center my-20">
                    <SuccessMessage/>
                    {isLoading ? (
                        <p>Loading order details...</p>
                    ) : finalOrderId ? (
                        <Link
                            className="flex items-center capitalize font-bold hover:underline mt-10"
                            to={`/orders/${finalOrderId}`}
                        >
                            <GoChevronLeft/>
                            see your order details
                        </Link>
                    ) : (
                        <Link
                            className="flex items-center capitalize font-bold hover:underline mt-10"
                            to="/orders"
                        >
                            <GoChevronLeft/>
                            see your order history
                        </Link>
                    )}
                </div>
            </Container>
        </RevelOnScroll>
    );
};

export default PaymentSuccessConfetti;
