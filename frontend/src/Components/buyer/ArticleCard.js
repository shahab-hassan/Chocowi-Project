import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ title, date, image, category, slug }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/articleDetail/${slug}`, { 
            state: { title, date, image, category, slug }
        });
    };

    return (
        <div className="articleCard" onClick={handleClick}>
            <img src={image} alt={title} className="articleImage" />
            <div className="articleContent">
                <div className="articleTitle">{title}</div>
                <div className="articleDate">{date}</div>
            </div>
        </div>
    );
};

export default ArticleCard;
