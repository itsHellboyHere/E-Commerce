import React from 'react';
import { useLoaderData } from "react-router-dom";

const DashboardCom = () => {
  const { res, totalOrders, total } = useLoaderData();
  const { users } = res.data;

  return (
    <section className="align-element flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Total Orders</h2>
          <div className="bg-secondary-content p-4 rounded-lg shadow">
            <p className="text-lg font-bold">{totalOrders}</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Total Products</h2>
          <div className="bg-secondary-content p-4 rounded-lg shadow">
            <p className="text-lg font-bold">{total}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {users.map((user, index) => (
            <div key={index} className="bg-secondary-content p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold">{user.name}</h3>
              
              <p className="text-sm text-gray-600 font-bold overflow-hidden  overflow-ellipsis">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardCom;
