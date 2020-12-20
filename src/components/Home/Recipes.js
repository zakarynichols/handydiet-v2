import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ rec }) => {

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
                    <Link key={r.id} to={`/recipe/${r.id}`} className="recipe-card">
                        <img src={r.image} className="responsive" />
                        <div style={{ overflowWrap: 'break-word' }}>{r.title}</div>
                        <br />
                        <div style={{
                            position: 'absolute',
                            bottom: 5,
                            left: 10,
                            fontSize: '1.5rem'
                        }}>{r.spoonacularScore}%</div>
                        <div style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 10,
                            fontSize: '1.5rem'
                        }}><i style={{ color: 'red' }} className="fas fa-heart"></i></div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Recipes;