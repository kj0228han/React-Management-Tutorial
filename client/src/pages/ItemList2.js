import React, { useState, useEffect } from 'react';

import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);  // 목록 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);  // 데이터 로딩 상태
  const [error, setError] = useState(null);  // 에러 처리 상태

  // 컴포넌트가 마운트될 때 데이터 fetch
  useEffect(() => {
    // 데이터 가져오는 함수
    const fetchItems = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');  // 샘플 API 호출
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);  // 빈 배열을 넣어 최초 한 번만 실행되도록 함

  // 로딩 중일 때 보여줄 메시지
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러가 있을 때 보여줄 메시지
  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  return (
    items.map(item => (
    <div className="left-aligned">
      <table border="1">
        <thead>          
          <tr>
            <th>111</th>
            <th>2222</th>
            <th>333</th>
          </tr>          
        </thead>
      </table>
  
    </div>
)))}
  


export default ItemList;