import React from 'react';
import './LoadingSpinnerStyle.css';

const Loading = ({ bool }) => {
    if (bool === false) {
        return <div style={{ textAlign: 'center' }} className="loader">Loading...</div>;
    };
    return bool;
};

export default Loading;