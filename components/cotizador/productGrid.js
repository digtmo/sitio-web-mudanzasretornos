import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ title, imageUrl, onClick }) => (
  <div
    className="product-card"
    onClick={() => onClick(title)}
  >
    <div className="image-container">
      <Image
        src={imageUrl}
        alt={`${title} icon`}
        width={100}
        height={100}
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
      {item.imagen ? (
        <Image
          src={item.imagen}
          alt={`${item.item} image`}
          width={80}
          height={80}
          className="mx-auto mb-2"
        />
      ) : (
        <div className="image-placeholder"></div>
      )}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-econotrans.digtmo.com/articulos');
        setData(response.data);
        if (response.data['Cocina-Logia']) {
          setSelectedCategory('Cocina-Logia');
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const categorySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="w-full lg:w-2/3 flex flex-col justify-center product-grid">
      <div className="sticky top-0 bg-white">
        <Slider {...categorySettings} className="category-slider">
          {Object.keys(data).map((category, index) => (
            <div key={index} className="px-2">
              <ProductCard
                title={category}
                imageUrl={imageUrls[category]}
                onClick={() => handleCardClick(category)}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className={`mt-20 ${selectedCategory ? 'block' : 'hidden'} lg:block`}>
        {selectedCategory && (
          <Slider {...settings} className="article-slider">
            {data[selectedCategory].map(item => (
              <div key={item.id} className="px-2">
                <ArticleCard
                  item={item}
                  quantity={quantities[item.id] || 0}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
