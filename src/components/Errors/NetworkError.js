import React from 'react';

const NetworkError = ({ bool, message }) => {
    if (bool === true) {
        return (
            <div className="wrap-inline-flex">
                <div style={{
                    display: 'inline-flex',
                    color: 'white',
                    textAlign: 'center',
                    backgroundColor: '#ff5245',
                    padding: '1em',
                    borderRadius: '.5em',
                    border: '2px solid #d11608'
                }}>
                    <i class="fas fa-exclamation-circle" style={{marginRight: '.5em'}}></i>
                    {message}</div>
            </div>
        );
    };
    return bool;
};

export default NetworkError;