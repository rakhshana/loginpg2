import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import MainNavigation from "../layout/MainNavigation";

const NewsFeed = ({ onLogout }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("en");

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  const CATEGORIES = [
    { value: "", label: "All" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "health", label: "Health" },
    { value: "entertainment", label: "Entertainment" },
  ];

  const COUNTRIES = [
    { value: "", label: "All" },
    { value: "us", label: "USA" },
    { value: "in", label: "India" },
    { value: "gb", label: "UK" },
    { value: "au", label: "Australia" },
  ];

  const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `${apiUrl}?apikey=${apiKey}&language=${language}${
          category ? `&category=${category}` : ""
        }${country ? `&country=${country}` : ""}`;
        console.log("Fetching URL:", url);

        const response = await axios.get(url);
        setArticles(response.data.results);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, country, language]);
  return (
    <>
      <MainNavigation onLogout={onLogout} />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "right", padding: "10px" }}></div>

        <h2 style={{ textAlign: "center", color: "#333", fontSize: "2rem" }}>
          News Feed
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginRight: "20px" }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div style={{ marginRight: "20px" }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {COUNTRIES.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>

          <div style={{ marginRight: "20px" }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {LANGUAGES.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
            Loading...
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {articles?.map((article, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3
                    style={{
                      color: "#007bff",
                      fontSize: "1.2rem",
                      marginBottom: "10px",
                    }}
                  >
                    {article.title}
                  </h3>
                </a>
                <p style={{ fontSize: "1rem", color: "#555" }}>
                  {article.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewsFeed;
