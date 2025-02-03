import React from 'react';
import Customer from './component/Customer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const customers = [
  {
    'id': 1,
    'image': 'https://picsum.photos/50/50',
    'name': '홍길동',
    'birthday': '20000101',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://picsum.photos/50/50',
    'name': '강감찬',
    'birthday': '20000101',
    'gender': '남자2',
    'job': '대학생2'
  },
  {
    'id': 3,
    'image': 'https://picsum.photos/50/50',
    'name': '임영웅',
    'birthday': '20000101',
    'gender': '남자2',
    'job': '대학생2'
  },
];

function App() {
  return (
    <Paper sx={{ width: '100%', marginTop: 2, overflowX: 'auto' }}>
      <div>
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
      </div>
    </Paper>
  );
}

export default App;