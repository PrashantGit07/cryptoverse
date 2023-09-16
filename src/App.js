
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { Space } from "antd";
// import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import Exchanges from "./Components/Exchanges"
import Homepage from "./Components/Homepage"
import News from "./Components/News"
import Cryptocurrencies from "./Components/Cryptocurrencies"
import CryptoDetails from "./Components/CryptoDetails"
import Navbar from "./Components/Navbar"

import './App.css';

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>

        <div className="routes">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
          <Link to="/">
            Cryptoverse Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/" style={{ color: "blueviolet" }}>Home</Link>
          {/* <Link to="/exchanges" style={{ color: "blueviolet" }}>Exchanges</Link> */}
          <Link to="/news" style={{ color: "blueviolet" }}>News</Link>
        </Space>
      </div>
    </div>
  </div>
);

export default App;
