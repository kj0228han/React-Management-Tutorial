const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// express 내장 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 설정 불러오기
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

// MySQL 연결 확인
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/api/customers', (req, res) => {
  connection.query("SELECT * FROM customer", (err, rows) => {
    if (err) {
      console.error('Database query error: ', err);
      return res.status(500).send('Database query error');
    }
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

