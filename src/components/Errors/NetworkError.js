import React from 'react';

const NetworkError = ({ bool, text }) => {
    if (bool === true) {
        return (
            <div style={{ color: 'red', textAlign: 'center' }}>{text}</div>
        );
    }
    return bool;
};

export default NetworkError;