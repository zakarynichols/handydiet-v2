import React from 'react';

const Recipes = ({ rec }) => {
    const getRandomInt = (min, max) => {
        const minimum = Math.ceil(min);
        const maximum = Math.floor(max);
        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    };

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {rec.map(r => {
                return (
                    <div key={r.id} className="recipe-card">
                        <img src={r.image} className="responsive" />
                        <div style={{ overflowWrap: 'break-word' }}>{r.title}</div>
                        <br />
                        <div style={{
                            position: 'absolute',
                            bottom: 5,
                            left: 10,
                            fontSize: '1.5rem'
                        }}>{getRandomInt(70, 100)}%</div>
                        <div style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 10,
                            fontSize: '1.5rem'
                        }}><i style={{ color: 'red' }} className="fas fa-heart"></i></div>
                    </div>
                );
            })}
        </div>
    )
};

export default Recipes;