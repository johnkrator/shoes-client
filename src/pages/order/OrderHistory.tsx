import { Link } from 'react-router-dom';
import { useGetAllOrdersQuery } from '@/redux/api/orderApiSlice';
import Container from "@/Container";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import {SkeletonDemo} from "@/components/Loader.tsx";

interface Order {
    _id: string;
    userId: string;
    totalAmount: number;
    createdAt: string;
    status?: string;
}

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

const OrderHistory = () => {
    const { data: orders, isLoading, error } = useGetAllOrdersQuery({}) as {
        data: Order[] | undefined,
        isLoading: boolean,
        error: ApiError | undefined
    };

    if (isLoading) {
        return (
            <Container>
                <div className="my-10">
                    <SkeletonDemo/>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <p className='my-10'>Error loading order history: {error.data.message}</p>
            </Container>
        );
    }

    return (
        <Container>
            <div className='my-10'>
                <h1 className="text-2xl font-bold mb-5">Order History</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders && orders.map((order: Order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.userId}</TableCell>
                                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{order.status || 'Processing'}</TableCell>
                                <TableCell>
                                    <Button asChild>
                                        <Link to={`/orders/${order._id}`}>View Details</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Container>
    );
};

export default OrderHistory;
