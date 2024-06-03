import { Link} from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formatPrice } from "../utils";
day.extend(advancedFormat);

const OrdersList = () => {
    const { orders, meta } = useLoaderData();
   
 
    return (
        <div className="align-element mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => {
                const { name, address, createdAt, orderItems = [], total , status} = order;
                const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');

                return (
                    <section key={order._id} className="border rounded-md overflow-hidden bg-gray-200 shadow-lg p-4 transform transition-transform hover:scale-105">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold capitalize">{status}</h3>
                            <h2 className="text-lg font-semibold">{name}</h2>
                            <p className="text-sm text-gray-600">{address}</p>
                        </div>
                        <div className="p-4 font-mono text-2xl">
                            <p className="text-sm text-gray-600"><span className=" font-bold">Order Date: </span>{date}</p>
                            <p className="text-sm text-gray-600"><span className="font-bold">Total Cost:</span> {formatPrice(total/100)}</p>
                            <div className="mt-4 grid grid-cols-1 gap-2">
                                {orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <Link to={`/products/${item.product}`} className="cursor-pointer">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md transition-transform hover:scale-110" />
                                        </Link>
                                        <div className="ml-2">
                                            <p className="text-sm text-gray-800 font-semibold">{item.name}</p>
                                            <p className="text-xs text-gray-600">Price: {formatPrice(item.price)}</p>
                                            <p className="text-xs text-gray-600">Quantity: {item.amount}</p>
                                            <p className="text-xs text-gray-600">Color: {item.productColor}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default OrdersList;
