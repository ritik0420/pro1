import React from 'react';
import { API } from '../config';

function ProductImg({item, url}) {
    return (
        <div className="product_img">
        <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="img"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
        </div>
    );
}

export default ProductImg;