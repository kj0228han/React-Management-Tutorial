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
    <div>
      <Customer
        id={customers[0].id}
        image={customers[0].image}
        name={customers[0].name}
        birthday={customers[0].birthday}
        gender={customers[0].gender}
        job={customers[0].job}

      />

      <Customer
        id={customers[1].id}
        image={customers[1].image}
        name={customers[1].name}
        birthday={customers[1].birthday}
        gender={customers[1].gender}
        job={customers[1].job}
      />
      <Customer
        id={customers[2].id}
        image={customers[2].image}
        name={customers[2].name}
        birthday={customers[2].birthday}
        gender={customers[2].gender}
        job={customers[2].job}
      />
    </div>
  )
}

export default App;