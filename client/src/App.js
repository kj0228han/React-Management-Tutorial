import React, { useState, useEffect } from 'react';
import Customer from './component/Customer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress'; // 한 번만 import
import Box from '@mui/material/Box';

function App() {
  const [customers, setCustomers] = useState([]);  // 고객 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    callApi()
      .then(res => {
        setCustomers(res);  // API에서 받은 데이터로 고객 상태 업데이트
        setLoading(false);  // 데이터 로드 후 로딩 상태 변경
      })
      .catch(err => {
        console.log(err);
        setLoading(false);  // 에러 발생 시에도 로딩 상태 변경
      });
  }, []);  // 빈 배열을 넣어주면 컴포넌트 마운트 시 한 번만 실행됨

  return (
    <Paper sx={{ width: '100%', marginTop: 2, overflowX: 'auto' }}>
      <div>
        {loading ? ( // 로딩 중일 때 CircularProgress 표시
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <Table style={{ minWidth: '1080px' }}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map(c => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </Paper>
  );
}

export default App;
