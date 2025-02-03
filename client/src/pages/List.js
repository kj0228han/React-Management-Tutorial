import React from 'react';

const User1=  ({userData}) => {
    return(
         <tr>
             <td>{userData.name}</td>
             <td>{userData.email}</td>
         </tr>
        )
}

const UserList = () => {
    const users = [
        {email: "ryu.com" , name: "유재석"},
        {email: "kim.com" , name: "김종국"},
        {email: "ha.com"  , name: "하하"  },
        {email: "song.com", name: "송지효"},
    ]
    
    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                </tr>
            </thead>

            <tbody>
                { 
                  users.map(user => (
                  <User1 userData= {user} />
                ))}
            
           </tbody>
        </table>

    )
}

export default UserList;