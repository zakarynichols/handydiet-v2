import React from 'react';

const NetworkError = ({ bool, message }) => {
    if (bool === true) {
        return (
            <div className="wrap-inline-flex">
            <div style={{
                display: 'inline-flex',
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#ff4d40',
                padding: '1em',
                borderRadius: '.5em',
            }}>{message}</div>
            </div>
        );
    };
    return bool;
};

export default NetworkError;