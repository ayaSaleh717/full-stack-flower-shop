import React, { useState, useEffect } from 'react';
import "./Categoryes.css"
import { getCategories } from '../../api/api';

const Categorys = ({ selectedCategory, onSelectCategory }) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
            <button
              className="btn-cat"
              onClick={() => onSelectCategory(null)}
              style={{
                padding: "10px 15px",
                backgroundColor:
                  selectedCategory === null ? "#e91e63" : "#e0e0e0",
                color: selectedCategory === null ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {categories.map((category) => (
                <button
                  className="btn-cat"
                  key={category.catId}
                  onClick={() => onSelectCategory(category.catId)}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      selectedCategory === category.catId ? "#e91e63" : "#e0e0e0",
                    color: selectedCategory === category.id ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {category.catName}
                </button>
            ))}
        </div>
    );
};

export default Categorys;


