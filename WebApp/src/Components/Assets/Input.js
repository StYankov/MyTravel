import React from 'react';

const Input = ({ name, value, onChange, label }) => (
    <div style={{ display: 'block', marginTop: 5, marginBottom: 5 }}>
        <label htmlFor={name}>{label}</label>
        <input required type="text" name={name} value={value} onChange={onChange} />
    </div>
)

export default Input;