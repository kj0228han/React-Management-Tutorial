import React, { useState, useEffect } from 'react';  //React 라이브러리와 useState, useEffect 훅을 가져옵니다. useState는 상태(state)를 관리하는 데 사용됩니다. useEffect는 컴포넌트가 렌더링된 후 특정 작업을 실행하는 데 사용됩니다.
import Customer from './component/Customer';         //Customer 컴포넌트를 import합니다. 이 컴포넌트는 개별 고객의 정보를 표시하는 역할을 합니다.
import CustomerAdd from './component/CustomerAdd';   //CustomerAdd 컴포넌트를 import합니다. 이 컴포넌트는 새 고객을 추가하는 기능을 담당합니다.
import Paper from '@mui/material/Paper';             //Material UI 라이브러리에서 Paper 컴포넌트를 import합니다. Paper는 카드처럼 보이게끔 내용을 감싸는 용도로 사용됩니다.
import Table from '@mui/material/Table';             //Table 컴포넌트를 import하여 데이터를 표 형식으로 보여줍니다.
import TableHead from '@mui/material/TableHead';     //테이블의 헤더를 설정하는 TableHead 컴포넌트를 import합니다.
import TableBody from '@mui/material/TableBody';     //테이블의 본문을 설정하는 TableBody 컴포넌트를 import합니다.
import TableRow from '@mui/material/TableRow';       //테이블의 각 행을 나타내는 TableRow 컴포넌트를 import합니다.
import TableCell from '@mui/material/TableCell';     //테이블의 각 셀을 나타내는 TableCell 컴포넌트를 import합니다.
import CircularProgress from '@mui/material/CircularProgress'; // 로딩 중을 표시하는 CircularProgress 컴포넌트를 import합니다. 로딩 스피너를 표시하는 데 사용됩니다
import Box from '@mui/material/Box';                //Box 컴포넌트를 import하여 레이아웃을 만들 때 사용됩니다.

function App() {

  const [customers, setCustomers] = useState([]);    // customers 상태 변수는 고객 데이터를 저장하는 역할을 합니다. 초기값은 빈 배열로 설정됩니다. setCustomers는 customers 상태를 업데이트하는 함수입니다.
  const [loading, setLoading] = useState(true);      // loading 상태 변수는 데이터가 로드 중인지를 추적합니다. 초기값은 true로 설정되어 로딩 중 상태로 시작됩니다. setLoading은 loading 상태를 업데이트하는 함수입니다.

  const stateRefresh = () => {
    callApi().then(res => {
      setCustomers(res); // API에서 받은 데이터로 고객 상태 업데이트
      setLoading(false); // 데이터 로드 후 로딩 상태 변경
    }).catch(err => {
      console.log(err);
      setLoading(false); // 에러 발생 시에도 로딩 상태 변경
    });
  };
  

  const callApi = async () => {                      //callApi는 비동기 함수로, /api/customers에서 고객 데이터를 가져오는 API 호출을 수행합니다
    const response = await fetch('/api/customers');  //await fetch('/api/customers'): 고객 데이터를 가져오는 HTTP 요청을 보냅니다.
    const body = await response.json();              //await response.json(): 응답을 JSON 형태로 변환하여 반환합니다.
    return body;
  };

  useEffect(() => {  //useEffect는 컴포넌트가 마운트될 때 한 번만 실행됩니다. 이곳에서 callApi를 호출하여 API에서 데이터를 가져오고 상태를 업데이트합니다.
    callApi()        //callApi를 호출하여 고객 데이터를 가져옵니다.
      .then(res => { //API 호출이 성공하면, 받은 데이터(res)로 customers 상태를 업데이트하고, loading 상태를 false로 설정합니다.
        setCustomers(res);  // API에서 받은 데이터로 고객 상태 업데이트
        //setLoading(false);  // 데이터 로드 후 로딩 상태 변경
      })
      .catch(err => {
        console.log(err);
        //setLoading(false);  // 에러 발생 시에도 로딩 상태 변경
      });
      setLoading(false);
  }, []);  // 빈 배열을 넣어주면 컴포넌트 마운트 시 한 번만 실행됨

  return (
    <div>
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
                  <TableCell>설정</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers.map(c => {
                  return (
                    // <Customer stateRefresh = {stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday}  gender={c.gender} job={c.job} />
                    <Customer stateRefresh = {stateRefresh}  key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday}  gender={c.gender} job={c.job} createDate ={c.createDate} isDeleted ={c.isDeleted}/>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
        <CustomerAdd stateRefresh = {stateRefresh} />
      </Paper>
    </div>
  );
}

export default App;
