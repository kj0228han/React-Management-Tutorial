import React from 'react';

const CustomerDelete = ({ id, stateRefresh }) => {

    const deleteCustomer = (id) => {
        const uri = '/api/customers/' + id;
        fetch(uri, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                stateRefresh();  // 성공적으로 삭제 후 새로 고침
            } else {
                alert('삭제 실패: ' + response.statusText);  // 실패 시 알림
            }
        })
        .catch(error => {
            alert('에러 발생: ' + error.message);  // 네트워크 오류 처리
        });
    }

    return (
        <button onClick={() => deleteCustomer(id)}>삭제</button>
    );
}

export default CustomerDelete;
