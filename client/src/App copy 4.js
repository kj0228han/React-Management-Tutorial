import React from 'react';
import Customer from './component/Customer';

const customer ={
    'id' : 1,
    'image' : 'https://picsum.photos/100/100', 
    'name' : '홍길동',
    'birthday' : '2000101',
    'gender' : '남자',
    'job' : '대학생'
}

function App() {
  return(
  <Customer 
      id = {customer.id}
      image ={customer.image}
      name = {customer.name}
      birthday = {customer.birthday}
      gender={customer.gender}
      job={customer.job}
      
  />
  )
  }

export default App;