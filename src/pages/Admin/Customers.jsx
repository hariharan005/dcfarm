import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Admin/Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/admin/orders");

        // Extract only unique customers by email
        const unique = {};
        res.data.forEach((order) => {
          if (!unique[order.customerEmail]) {
            unique[order.customerEmail] = {
              name: order.customerName,
              email: order.customerEmail,
              phone: order.customerPhone,
              address: order.customerAddress,
            };
          }
        });

        setCustomers(Object.values(unique));
      } catch (err) {
        console.error("Failed to fetch customers", err);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customers-page">
      <h3>Customer List</h3>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>S:No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
