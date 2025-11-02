import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import './select.scss'

const Select = ({ resource, defaultText, id, setter, data, label }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [text, setText] = useState(defaultText);

    const handleClick = (value) => {
        setter(value);
        setText(value)
        setShowOptions(false)
    }

    const detailBuilder = (data) => {
        switch (resource) {
            case "facilities":
                return `${data.city}, ${data.facilityState} ${data.zipCode}`;
            case "trucks":
                return `${data.driver_name}, ${data.capacity} lbs`;
            default:
                return;
        }
    }


    return (
        <div className='select-container' id={id}>
            <div className="select" onClick={() => setShowOptions(!showOptions)}>
                <div className="defaultText">{text}</div>
                <ExpandMoreIcon className='btn'/>
            </div>
            {
                showOptions && (
                    <div className='resultsList'>
                        {
                            data.map((option) => {
                                return (
                                    <div className="resultOption" onClick={() => handleClick(option[label])} key={option.id}>
                                        <div className="top">{option[label]}</div>
                                        <div className="bottom">{detailBuilder(option)}</div>
                                    </div>
                                )

                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Select