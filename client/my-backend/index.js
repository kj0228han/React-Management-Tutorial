// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // CORS 허용

// 간단한 데이터 예시
const data = {
  message: "Hello from Node.js!"
};

// GET 요청을 처리하는 API 엔드포인트
app.get('/api/data', (req, res) => {
  res.json(data); // JSON 형태로 데이터 전달
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});