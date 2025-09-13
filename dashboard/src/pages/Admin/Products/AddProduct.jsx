import React from 'react';

const AddProduct = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add product submission logic here
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" name="productName" required />
                </div>
                <div>
                    <label htmlFor="productPrice">Product Price:</label>
                    <input type="number" id="productPrice" name="productPrice" required />
                </div>
                <div>
                    <label htmlFor="productDescription">Product Description:</label>
                    <textarea id="productDescription" name="productDescription" required></textarea>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;