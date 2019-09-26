import React from 'react';

import './collection-item.styles.scss';

const CollecctionItem = ({ id, name, price, imageUrl }) => (
    <div className="collection-item">
        <div
            className="image"
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        >
        </div>
        <div className="collection-footer">
            <div className="name">{name}</div>
            <div className="class">{price}</div>
        </div>
    </div>
);

export default CollecctionItem;