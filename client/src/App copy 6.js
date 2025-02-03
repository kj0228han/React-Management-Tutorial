import React from 'react';
import Customer from './component/Customer';

const customers = [
  {
    'id': 1,
    'image': 'https://picsum.photos/100/100',
    'name': '홍길동',
    'birthday': '2000101',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://picsum.photos/100/100',
    'name': '강감찬',
    'birthday': '2000101',
    'gender': '남자2',
    'job': '대학생2'
  },
  {
    'id': 3,
    'image': 'https://picsum.photos/100/100',
    'name': '임영웅',
    'birthday': '2000101',
    'gender': '남자2',
    'job': '대학생2'
  },
]

function App() {
  return (
    
    customers.map(c => {
      
      return ( <Customer
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
              />
      );
      

    }))
  
    }

export default App;