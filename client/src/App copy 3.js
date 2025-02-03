import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";

function App() {
  // 드롭다운 메뉴 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Router>
      <div>
        <nav style={{ backgroundColor: '#333', padding: '10px' }}>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
            {/* 홈 메뉴 드롭다운 */}
            <li 
              style={{ marginRight: '20px', position: 'relative' }} 
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link to="/#home" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px', display: 'block', borderRadius: '5px' }}>
               홈
              </Link>
              {dropdownOpen && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: '#444',
                  padding: '10px 0',
                  listStyleType: 'none',
                  margin: 0,
                  borderRadius: '5px',
                  zIndex: 1,
                  width: '200%'
                }}>
                  <li style={{ padding: '10px 15px' }}>
                    <Link to="/home1" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                  </li>
                  <li style={{ padding: '10px 15px' }}>
                    <Link to="/About1" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
                  </li>
                  <li style={{ padding: '10px 15px' }}>
                    <Link to="/Count1" style={{ color: 'white', textDecoration: 'none' }}>Count</Link>
                  </li>
                </ul>
              )}
            </li>
            
            <li style={{ marginRight: '20px' }}>
              <Link to="/#about" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px', display: 'block', borderRadius: '5px' }}>소개</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to="/#services" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px', display: 'block', borderRadius: '5px' }}>서비스</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to="/#contact" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px', display: 'block', borderRadius: '5px' }}>연락처</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* 추가된 라우트 - /home 경로에서 Home 컴포넌트 렌더링 */}
          <Route path="/home1" element={<Home />} />
          <Route path="/About1" element={<About />} />
          <Route path="/Count1" element={<Counter />} />
     
          <Route path="/" element={
            <div>
              <section id="home">
                <h1>홈</h1>
                <p>홈 페이지 내용</p>
              </section>
              <section id="home1">
                <h1>홈1</h1>
                <p>홈1 페이지 내용</p>
              </section>
              <section id="home2">
                <h1>홈2</h1>
                <p>홈2 페이지 내용</p>
              </section>
              <section id="home3">
                <h1>홈3</h1>
                <p>홈3 페이지 내용</p>
              </section>
              <section id="about">
                <h1>소개</h1>
                <p>소개 페이지 내용</p>
              </section>
              <section id="services">
                <h1>서비스</h1>
                <p>서비스 페이지 내용</p>
              </section>
              <section id="contact">
                <h1>연락처</h1>
                <p>연락처 페이지 내용</p>
              </section>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;