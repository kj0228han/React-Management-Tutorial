/* [기능요약설명]
//CORS와 파일 업로드를 처리하며, 
// MySQL 데이터베이스와 연결해 데이터를 저장하는 Express 서버를 구현한 코드입니다.
//고객 정보를 MySQL 데이터베이스에 저장하고, 업로드된 이미지를 파일 시스템에 저장하여 /image/ 경로로 제공하며, 
// 클라이언트에서 데이터를 JSON 형식으로 응답받습니다.
*/

const fs = require('fs');       //fs: Node.js의 내장 모듈로 파일 시스템을 제어할 수 있습니다. (파일 읽기, 쓰기, 디렉토리 생성 등)
const express = require('express');  //express: Express.js 프레임워크를 사용하여 웹 서버를 설정합니다.
const app = express();  //app: Express 애플리케이션 객체로, HTTP 요청을 처리합니다.

const cors = require('cors'); //cors: CORS (Cross-Origin Resource Sharing) 미들웨어를 사용하여 다른 도메인에서 요청을 허용하도록 설정합니다.
app.use(cors());

const port = process.env.PORT || 5000;  //port: 환경 변수에서 포트를 찾고, 없으면 5000번 포트를 사용하도록 설정합니다.

const uploadDir = './upload';  //uploadDir: 업로드된 파일을 저장할 디렉토리 경로를 지정합니다.

console.log('2222-1');

// 업로드 디렉토리 존재 여부 확인 및 생성
if (!fs.existsSync(uploadDir)) {  //fs.existsSync(uploadDir): 업로드 디렉토리가 존재하는지 확인합니다.
  fs.mkdirSync(uploadDir, { recursive: true });  //디렉토리가 없으면 uploadDir을 생성합니다.
}

console.log('2222-2');

// express 내장 미들웨어 사용
app.use(express.json());  //클라이언트가 보낸 JSON 형식의 데이터를 파싱하여 req.body로 사용할 수 있게 합니다.
app.use(express.urlencoded({ extended: true }));  //express.urlencoded(): application/x-www-form-urlencoded 형식으로 보내진 데이터를 파싱합니다.

// 데이터베이스 설정 불러오기
fs.readFile('./database.json', (err, data) => {  //fs.readFile(): database.json 파일을 읽어옵니다. 이 파일에는 MySQL 연결 정보를 포함한 설정이 저장되어 있습니다.
  if (err) {
    console.error('Error reading database config: ', err);
    return;
  }
  const conf = JSON.parse(data);  //JSON.parse(): 읽은 데이터를 JSON 형식으로 파싱합니다.

  console.log('2222-3');

  const mysql = require('mysql');
  const connection = mysql.createConnection({  //mysql.createConnection(): MySQL 데이터베이스와 연결을 설정합니다.
    host: conf.host,      //conf: database.json에서 읽은 MySQL 연결 설정을 사용하여 연결 객체를 생성합니다.
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
  });


  // MySQL 연결 확인
  connection.connect((err) => {  //connection.connect(): MySQL 서버와 연결을 시도합니다.
    if (err) {
      console.error('MySQL connection error: ', err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);  //연결 성공 시 threadId를 출력합니다.
  });

  const multer = require('multer');  //multer: 파일 업로드를 처리하는 미들웨어입니다.
  const path = require('path');

  // 업로드 디렉토리와 파일 이름을 설정
  const storage = multer.diskStorage({  //multer.diskStorage(): 업로드된 파일의 저장 위치와 이름을 설정합니다.
    destination: './upload',    //destination: 파일이 저장될 디렉토리 경로 설정 (./upload).
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // 확장자 추출
      cb(null, Date.now() + ext); // 파일명 중복 방지  //filename: 파일의 이름을 Date.now()로 설정하여 중복을 피하고, 확장자는 원래 파일의 확장자를 사용합니다.
    }
  });

  const upload = multer({ storage: storage });

  app.get('/api/customers', (req, res) => { //api/customers 경로로 GET 요청이 오면, MySQL 데이터베이스에서 고객 목록을 조회하고 JSON 형식으로 응답합니다.
    connection.query("SELECT * FROM customer WHERE isDeleted = '0'", (err, rows) => {
      if (err) {
        console.error('Database query error: ', err);
        return res.status(500).send('Database query error');
      }
      res.json(rows);
    });
  });

  // image 디렉토리 정적 파일로 서빙
  app.use('/image', express.static('./upload'));        ///image 경로에서 업로드된 이미지를 제공하도록 설정합니다. 사용자가 /image/<filename> 경로로 이미지에 접근할 수 있습니다.

  app.post('/api/customers', upload.single('image'), (req, res) => {  ///api/customers 경로로 POST 요청이 오면, 클라이언트에서 보낸 고객 데이터를 MySQL 데이터베이스에 저장합니다. //upload.single('image'): 업로드된 이미지 파일을 하나 처리하도록 설정합니다. 'image'는 클라이언트에서 보낸 파일 필드 이름입니다.
    if (!req.file) {
      return res.status(400).send('No file uploaded');  //파일이 정상적으로 업로드되지 않으면 400 상태 코드와 함께 오류 메시지를 반환합니다.
    }

    let { name, birthday, gender, job } = req.body;     //고객의 name, birthday, gender, job을 데이터베이스에 저장합니다.

    if (!name || !birthday || !gender || !job) {
      return res.status(400).send('Missing required fields');
    }
    console.log("11111");

    const sql = 'INSERT INTO customer VALUES (null,?,?,?,?,?,now(),"0")';

    const image = '/image/' + req.file.filename;
    name = req.body.name;
    birthday = req.body.birthday;
    gender = req.body.gender;
    job = req.body.job;
    createDate = req.body.createDate;
    isDeleted = req.body.isDeleted;

    const params = [image, name, birthday, gender, job,createDate,isDeleted];

    console.log(name);
    console.log(birthday);
    console.log(gender);
    console.log(job);

    connection.query(sql, params, (err, rows) => {
      console.log('rows::' + rows);
      console.log('err::' + err);
      if (err) {
        console.error('Database query error: ', err);
        return res.status(500).send('Database query error');
      }
      res.json(rows);
    });
  });

  app.delete('/api/customers/:id', (req ,res) =>{
    let sql = 'UPDATE customer SET isDeleted = "1" where id =?';
    let params =[req.params.id];
    connection.query(sql,params,
      (err, rows, fields) =>{
        res.send(rows);
      }
    )
  })
  app.listen(port, () => console.log(`Listening on port ${port}`));  //지정된 포트에서 Express 서버를 실행합니다. 클라이언트의 요청을 기다립니다

});