import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import Header from '../Header';
import './index.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('RECOMMENDED');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    const updatedSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelected);

    const filtered = updatedSelected.length === 0
      ? products
      : products.filter(product => updatedSelected.includes(product.category));

    setFilteredProducts(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setSortDropdownOpen(false);

    let sorted = [...filteredProducts];
    if (option === 'NEWEST FIRST') {
      sorted = sorted.reverse();
    } else if (option === 'PRICE : LOW TO HIGH') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'PRICE : HIGH TO LOW') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  };

  const sortOptions = [
    'RECOMMENDED',
    'NEWEST FIRST',
    'POPULAR',
    'PRICE : HIGH TO LOW',
    'PRICE : LOW TO HIGH',
  ];

  return (
    <>
      <Header />
      <div className="home-container">
        <section className="hero">
          <h2>DISCOVER OUR PRODUCTS</h2>
          <p>Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque.</p>
        </section>

        <div className="content-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <h4>{filteredProducts.length} ITEMS</h4>
            <button className="filter-toggle">HIDE FILTER</button>

            <div className="filter-group">
              <p><strong>CUSTOMIZABLE</strong></p>
              <input type="checkbox" />
            </div>

            <div className="filter-group">
              <p><strong>CATEGORIES</strong></p>
              {categories.map(category => (
                <div className='filter-card'>
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
                </div>
              ))}
            </div>

            {/* Add more filter groups similar to above */}
            {['IDEAL FOR', 'OCCASION', 'WORK', 'FABRIC', 'SEGMENT', 'SUITABLE FOR', 'RAW MATERIALS', 'PATTERN'].map(title => (
              <div className="filter-group" key={title}>
                <p><strong>{title}</strong></p>
                <select>
                  <option>All</option>
                </select>
              </div>
            ))}
          </aside>

          {/* Main Content */}
          <main className="product-area">
            <div className="top-bar">
              <div className="sort-box">
                <div
                  className="sort-selected"
                  onClick={() => setSortDropdownOpen(prev => !prev)}
                >
                  {sortOption} <span>▾</span>
                </div>
                {sortDropdownOpen && (
                  <ul className="sort-dropdown">
                    {sortOptions.map(option => (
                      <li
                        key={option}
                        className={sortOption === option ? 'selected' : ''}
                        onClick={() => handleSort(option)}
                      >
                        {sortOption === option && '✔ '}
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
