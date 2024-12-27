import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const ProductCard = ({ title, imageUrl, onClick }) => (
  <div className="product-card" onClick={() => onClick(title)}>
    <div className="image-container">
      <Image
        src={imageUrl}
        alt={`${title} icon`}
        width={80}
        height={80}
        className="mx-auto"
      />
    </div>
    <div className="text-container">
      <div className="flex items-center justify-center">
        <span className="title">{title}</span>
      </div>
    </div>
  </div>
);

const ArticleCard = ({ item, quantity, onIncrement, onDecrement }) => (
  <div className="article-card">
    <div className="text-center">
      <div className="image-container">
        {item.imagen ? (
          <Image
            src={item.imagen}
            alt={`${item.item} image`}
            width={50}
            height={20}
            className="mx-auto mb-2"
          />
        ) : (
          <div className="image-placeholder"></div>
        )}
      </div>
      <span className="title">{item.item}</span>
    </div>
    <div className="quantity-controls">
      <button onClick={onDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  </div>
);

const imageUrls = {
  'Cocina-Logia': '/cocina-logia-2.webp',
  'Comedor': '/comedor.webp',
  'Dormitorio': '/dormitorio-2.webp',
  'Estar': '/estar.webp',
  'Living': '/living.webp',
  'Patio-Bodega': '/patio-bodega.webp'
};

const ProductGrid = ({ onTotalVolumeChange, setQuantities, quantities }) => {
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [totalVolume, setTotalVolume] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-econotrans-v2.digtmo.com/articulos');
        setData(response.data);
        const categories = Object.keys(response.data);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    const articulosElement = document.getElementById('articulos');
    if (articulosElement) {
      articulosElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreviousCategory = () => {
    const categories = Object.keys(data);
    if (categoryIndex > 0) { // Limitar a la primera categoría
        const newIndex = categoryIndex - 1;
        setCategoryIndex(newIndex);
        handleCategoryChange(categories[newIndex]);
    }
  };

  const handleNextCategory = () => {
    const categories = Object.keys(data);
    if (categoryIndex < categories.length - 1) { // Limitar a la última categoría
        const newIndex = categoryIndex + 1;
        setCategoryIndex(newIndex);
        handleCategoryChange(categories[newIndex]);
    }
  };

  const handleIncrement = (id) => {
    setQuantities(prev => {
      const newQuantities = { ...prev, [id]: (prev[id] || 0) + 1 };
      const newVolume = calculateTotalVolume(newQuantities);
      setTotalVolume(newVolume);
      onTotalVolumeChange(newVolume);
      return newQuantities;
    });
  };

  const handleDecrement = (id) => {
    setQuantities(prev => {
      const newQuantities = { ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) };
      const newVolume = calculateTotalVolume(newQuantities);
      setTotalVolume(newVolume);
      onTotalVolumeChange(newVolume);
      return newQuantities;
    });
  };

  const calculateTotalVolume = (quantities) => {
    let total = 0;
    for (const category in data) {
      for (const item of data[category]) {
        total += (quantities[item.id] || 0) * parseFloat(item.volumen_m3);
      }
    }
    return total;
  };

  return (
    <div id="cotizador" className="flex items-center justify-center h-screen">
      <div className="w-full max-w-4xl flex flex-col justify-center product-grid p-4 mt-4"> 
        <h2>Selecciona la habitación</h2>
        <div id="categorias" className="sticky top-0 bg-white flex flex-wrap justify-center category-slider">
          {Object.keys(data).map((category, index) => (
            <div key={index} className="px-2">
              <ProductCard
                title={category}
                imageUrl={imageUrls[category]}
                onClick={() => handleCategoryChange(category)}
              />
            </div>
          ))}
        </div>
        <div id="articulos" className='mt-4'>
          <h2 className='text-center'>Selecciona los articulos</h2>
          <div className={`mt-20 ${selectedCategory ? 'block' : 'hidden'} article-grid`}>
            {selectedCategory && (
              <>
                <div className="article-grid">
                  {data[selectedCategory].map(item => (
                    <div key={item.id} className="m-2">
                      <ArticleCard
                        item={item}
                        quantity={quantities[item.id] || 0}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {selectedCategory && (
          <div className="navigation-buttons mt-4">
            <button onClick={handlePreviousCategory} className="nav-button">
              <span>←</span>
              <span>Habitación</span>
              <span>anterior</span>
            </button>
            <button onClick={handleNextCategory} className="nav-button">
              <span>→</span>
              <span>Siguiente</span>
              <span>habitación</span>
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .navigation-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
          width: 100%;
        }
        .nav-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          border: none;
          background: none;
          cursor: pointer;
        }
        .nav-button span:first-child {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;