import React, { useState, useMemo, useRef, useEffect } from "react";
import axios from "axios";

export default function CotizarNew({
  onTotalVolumeChange, // callback para actualizar el volumen en MainComponent
  onQuantitiesChange,  // callback para actualizar las cantidades en MainComponent
  parentQuantities,    // para leer las cantidades del padre
  reservaId            // prop para recibir el id de la reserva creada previamente
}) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalVolume, setTotalVolume] = useState(0);
  const searchContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});

  const logos = {
    "cocina-logia": '/cocina.webp',
    "living": '/living.webp',
    "estar": '/estar.webp',
    "comedor": '/comedor.webp',
    "dormitorio": '/dormitorio-2.webp',
    "patio-bodega": '/patio-bodega.webp'
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://backend-econotrans-v2.digtmo.com/articulos");
        const data = await res.json();
        const categoriesFromApi = Object.keys(data).map((categoryName) => ({
          name: categoryName,
          items: data[categoryName].map((item) => ({
            id: item.id,
            name: item.item,
            volume: parseFloat(item.volumen_m3),
            quantity: 0,
            delicado: false,
            escalera: false,
          })),
        }));
        setCategories(categoriesFromApi);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const recalcParentState = (updatedCategories) => {
    const newTotalVolume = updatedCategories.reduce((accCat, cat) => {
      return accCat + cat.items.reduce((accItem, item) => {
        return accItem + item.volume * item.quantity;
      }, 0);
    }, 0);
    setTotalVolume(newTotalVolume);
    if (onTotalVolumeChange) onTotalVolumeChange(newTotalVolume);
    const newQuantities = {};
    updatedCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.quantity > 0) {
          newQuantities[item.id] = item.quantity;
        }
      });
    });
    if (onQuantitiesChange) onQuantitiesChange(newQuantities);
  };

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
    recalcParentState(newCategories);
  };

  const handleIncrement = (categoryName, itemId) => {
    const newCategories = [...categories];
    const catIndex = newCategories.findIndex((c) => c.name === categoryName);
    if (catIndex >= 0) {
      const itemIndex = newCategories[catIndex].items.findIndex((it) => it.id === itemId);
      if (itemIndex >= 0) {
        newCategories[catIndex].items[itemIndex].quantity++;
      }
    }
    updateCategories(newCategories);
  };

  const handleDecrement = (catIndex, itemIndex) => {
    const newCategories = [...categories];
    if (newCategories[catIndex].items[itemIndex].quantity > 0) {
      newCategories[catIndex].items[itemIndex].quantity--;
    }
    updateCategories(newCategories);
  };

  const handleCheckboxChange = (catIndex, itemIndex, field, checked) => {
    const newCategories = [...categories];
    newCategories[catIndex].items[itemIndex][field] = checked;
    updateCategories(newCategories);
  };

  const allItems = useMemo(() => {
    if (!categories.length) return [];
    return categories.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        categoryName: cat.name,
      }))
    );
  }, [categories]);

  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    return allItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allItems]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!categories.length) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Cargando artículos...</h2>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="mobileContainer">
        {categories.map((cat, catIndex) => (
          <div key={catIndex} className="accordion">
            <div className="accordionHeader" onClick={() => toggleAccordion(catIndex)}>
              <div className="headerLeft">
                <img
                  src={logos[cat.name.toLowerCase()] || "/logos/default.png"}
                  alt={`${cat.name} logo`}
                  className="categoryLogo"
                />
                <span className="categoryTitle">{cat.name}</span>
              </div>
              <span className="accordionArrow">{openAccordions[catIndex] ? "▲" : "▼"}</span>
            </div>
            {openAccordions[catIndex] && (
              <div className="accordionContent">
                <div className="itemsHeader">
                  <div className="headerName">Artículo</div>
                  <div className="headerQuantity">Cant.</div>
                  <div className="headerDelicado">Del.</div>
                  <div className="headerEscalera">Esc.</div>
                </div>
                {cat.items.map((item, itemIndex) => (
                  <div key={item.id} className="itemRow">
                    <div className="itemName">{item.name}</div>
                    <div className="quantityControls">
                      <button onClick={() => handleDecrement(catIndex, itemIndex)}>-</button>
                      <span className="itemQuantity">{item.quantity}</span>
                      <button onClick={() => handleIncrement(cat.name, item.id)}>+</button>
                    </div>
                    <div className="checkboxCell">
                      <input
                        type="checkbox"
                        checked={item.delicado}
                        onChange={(e) => handleCheckboxChange(catIndex, itemIndex, "delicado", e.target.checked)}
                      />
                    </div>
                    <div className="checkboxCell">
                      <input
                        type="checkbox"
                        checked={item.escalera}
                        onChange={(e) => handleCheckboxChange(catIndex, itemIndex, "escalera", e.target.checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="bottomRow">
          <div className="searchContainer" ref={searchContainerRef}>
            <input
              type="text"
              className="searchInput"
              placeholder="Buscar un artículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && filteredResults.length > 0 && (
              <div className="searchResults">
                {filteredResults.map((item) => (
                  <div key={item.id} className="searchItem">
                    <span>
                      {item.name} <small>({item.categoryName})</small>
                    </span>
                    <button onClick={() => handleIncrement(item.categoryName, item.id)}>+</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="totalVolume">
            Volumen total: {totalVolume.toFixed(2)} m³
          </div>
        </div>
        <style jsx>{`
          .mobileContainer {
            width: 100%;
            padding: 0;
            margin: 0;
            background-color: #fafafa;
          }
          .accordion {
            border-bottom: 1px solid #eee;
          }
          .accordionHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 1rem;
            background: #f3f3f3;
            cursor: pointer;
          }
          .headerLeft {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .categoryLogo {
            width: 24px;
            height: 24px;
            object-fit: contain;
          }
          .categoryTitle {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
          }
          .accordionArrow {
            font-size: 1rem;
          }
          .accordionContent {
            padding: 0.5rem 1rem;
          }
          .itemsHeader {
            display: grid;
            grid-template-columns: 2fr 1fr 0.8fr 0.8fr;
            font-weight: bold;
            padding: 0.3rem 0;
            background: #f9f9f9;
            text-align: center;
            font-size: 0.9rem;
          }
          .itemRow {
            display: grid;
            grid-template-columns: 2fr 1fr 0.8fr 0.8fr;
            align-items: center;
            padding: 0.3rem 0;
            border-bottom: 1px solid #eee;
            text-align: center;
            font-size: 0.9rem;
          }
          .itemName {
            text-align: left;
          }
          .quantityControls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.3rem;
          }
          button {
            background-color: #0070f3;
            border: none;
            color: #fff;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease;
            font-size: 0.9rem;
          }
          button:hover {
            background-color: #005bb5;
          }
          .itemQuantity {
            min-width: 1.5ch;
            text-align: center;
          }
          .checkboxCell {
            display: flex;
            justify-content: center;
          }
          .bottomRow {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .searchContainer {
            position: relative;
            width: 100%;
          }
          .searchInput {
            width: 100%;
            padding: 0.6rem 1rem;
            border: 2px solid #0070f3;
            border-radius: 8px;
            font-size: 1rem;
            outline: none;
          }
          .searchResults {
            position: absolute;
            top: 42px;
            left: 0;
            right: 0;
            background: #fff;
            border: 2px solid #0070f3;
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-height: 250px;
            overflow-y: auto;
            z-index: 10;
          }
          .searchItem {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 0.9rem;
          }
          .searchItem:hover {
            background: #f9f9f9;
          }
          .totalVolume {
            font-size: 1.1rem;
            font-weight: bold;
            color: #0070f3;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  // ===================== RENDERIZADO PARA VISTA DESKTOP =====================
  return (
    <div className="container">
      <aside className="sidebar">
        {categories.map((cat, catIndex) => (
          <div
            key={catIndex}
            className={catIndex === selectedCategoryIndex ? "categoryItem active" : "categoryItem"}
            onClick={() => setSelectedCategoryIndex(catIndex)}
          >
            <div className="categoryItemContent">
              <img
                src={logos[cat.name.toLowerCase()] || "/logos/default.png"}
                alt={`${cat.name} logo`}
                className="categoryLogo"
              />
              <span>{cat.name}</span>
            </div>
          </div>
        ))}
      </aside>
      <main className="mainContent">
        <h2>{categories[selectedCategoryIndex].name}</h2>
        <div className="itemsHeader">
          <div className="headerName">Artículo</div>
          <div className="headerQuantity">Cantidad</div>
          <div className="headerDelicado">Delicado</div>
          <div className="headerEscalera">Cargado<br />por escalera</div>
        </div>
        <div className="itemsList">
          {categories[selectedCategoryIndex].items.map((item, itemIndex) => (
            <div key={item.id} className="itemRow">
              <div className="itemName">{item.name}</div>
              <div className="quantityControls">
                <button onClick={() => handleDecrement(selectedCategoryIndex, itemIndex)}>-</button>
                <span className="itemQuantity">{item.quantity}</span>
                <button onClick={() => handleIncrement(categories[selectedCategoryIndex].name, item.id)}>+</button>
              </div>
              <div className="checkboxCell">
                <input
                  type="checkbox"
                  checked={item.delicado}
                  onChange={(e) => handleCheckboxChange(selectedCategoryIndex, itemIndex, "delicado", e.target.checked)}
                />
              </div>
              <div className="checkboxCell">
                <input
                  type="checkbox"
                  checked={item.escalera}
                  onChange={(e) => handleCheckboxChange(selectedCategoryIndex, itemIndex, "escalera", e.target.checked)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="bottomRow">
          <div className="searchContainer" ref={searchContainerRef}>
            <input
              type="text"
              className="searchInput"
              placeholder="Buscar un artículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && filteredResults.length > 0 && (
              <div className="searchResults">
                {filteredResults.map((item) => (
                  <div key={item.id} className="searchItem">
                    <span>
                      {item.name} <small>({item.categoryName})</small>
                    </span>
                    <button onClick={() => handleIncrement(item.categoryName, item.id)}>+</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="totalVolume">
            Volumen total: {totalVolume.toFixed(2)} m³
          </div>
        </div>
      </main>
      <style jsx>{`
        .container {
          display: flex;
          min-height: 70vh;
          background-color: #fafafa;
          color: #333;
          font-family: "Helvetica Neue", Arial, sans-serif;
        }
        .sidebar {
          width: 240px;
          background: #fff;
          border-right: 1px solid #eee;
        }
        .categoryItem {
          cursor: pointer;
          padding: 1rem;
          border-bottom: 1px solid #f5f5f5;
          transition: background 0.2s ease, font-weight 0.2s;
        }
        .categoryItem:hover {
          background: #f9f9f9;
        }
        .categoryItem.active {
          background: #f0f0f0;
          font-weight: 600;
        }
        .categoryItemContent {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .categoryLogo {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .mainContent {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }
        h2 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: #666;
        }
        .itemsHeader {
          display: grid;
          grid-template-columns: 2fr 1fr 0.7fr 1fr;
          font-weight: bold;
          padding: 0.5rem 1rem;
          background: #f3f3f3;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .headerName {
          text-align: left;
        }
        .headerEscalera {
          line-height: 1.2;
        }
        .itemsList {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        .itemRow {
          display: grid;
          grid-template-columns: 2fr 1fr 0.7fr 1fr;
          align-items: center;
          margin-bottom: 0.5rem;
          background: #fff;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          text-align: center;
        }
        .itemName {
          text-align: left;
        }
        .quantityControls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        button {
          background-color: #0070f3;
          border: none;
          color: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        button:hover {
          background-color: #005bb5;
        }
        .itemQuantity {
          min-width: 2ch;
          text-align: center;
        }
        .checkboxCell {
          display: flex;
          justify-content: center;
        }
        .bottomRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .searchContainer {
          position: relative;
          max-width: 400px;
        }
        .searchInput {
          width: 100%;
          padding: 0.6rem 1rem;
          border: 2px solid #0070f3;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
        }
        .searchResults {
          position: absolute;
          top: 42px;
          left: 0;
          right: 0;
          background: #fff;
          border: 2px solid #0070f3;
          border-top: none;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-height: 250px;
          overflow-y: auto;
          z-index: 10;
        }
        .searchItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .searchItem:hover {
          background: #f9f9f9;
        }
        .totalVolume {
          font-size: 1.1rem;
          font-weight: bold;
          color: #0070f3;
        }
      `}</style>
    </div>
  );
}
