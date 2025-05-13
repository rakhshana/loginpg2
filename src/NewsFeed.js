import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = ({ onLogout }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('en');

  const apiKey = 'pub_8665936db06feaa099e031608f41cba2ff206';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=${language}${category && `&category=${category}`}${country && `&country=${country}`}`;
        const response = await axios.get(url);
        setArticles(response.data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, country, language]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5' }}>
      
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <button
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
        >
          Logout
        </button>
      </div>

      {/* Heading */}
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem' }}>News Feed</h2>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <label style={{ fontSize: '1rem', marginRight: '8px' }}>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '150px',
            }}
          >
            <option value="">All</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <div style={{ marginRight: '20px' }}>
          <label style={{ fontSize: '1rem', marginRight: '8px' }}>Country:</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '150px',
            }}
          >
            <option value="">All</option>
            <option value="us">USA</option>
            <option value="in">India</option>
            <option value="gb">UK</option>
            <option value="au">Australia</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '1rem', marginRight: '8px' }}>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '150px',
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {articles?.map((article, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
            >
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h3 style={{ color: '#007bff', fontSize: '1.2rem', marginBottom: '10px' }}>
                  {article.title}
                </h3>
              </a>
              <p style={{ fontSize: '1rem', color: '#555' }}>{article.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
