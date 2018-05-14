import React from 'react';

const DropDownWork = ({ label, name, value, onChange }) => (
    <div>
        <label htmlFor="dropdown">{label}</label>
        <div className="styled-select slate">
            <select name={name} value={value} onChange={onChange}>
                <option disabled value="">Избери</option>
                <option value="all">Всеки ден</option>
                <option value="workday">Делничен</option>
                <option value="weekend">Събота и неделя</option>
            </select>
        </div>
    </div>
);

export default DropDownWork;