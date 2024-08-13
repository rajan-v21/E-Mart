
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/ProductService';

function FetchPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="App">
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default FetchPage;
