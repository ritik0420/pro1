import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="form-check-input"
            />
            <label className="form-check-label">{p.name}</label>
        </li>
    ));
};

export default RadioBox;