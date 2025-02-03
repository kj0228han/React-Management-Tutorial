import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ backgroundColor: '#333', padding: '10px' }}>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
            <li style={{ marginRight: '20px' }}>
              <Link to="/#home" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px', display: 'block', borderRadius: '5px' }}>홈</Link>
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
          <Route path="/" element={
            <div>
              <section id="home">
                <h1>홈</h1>
                <p>홈 페이지 내용</p>
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