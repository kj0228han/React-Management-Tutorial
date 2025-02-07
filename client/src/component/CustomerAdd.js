{/*이 컴포넌트는 사용자에게 폼을 통해 고객의 정보를 입력받고, 
    해당 정보를 서버에 POST 요청으로 전송하는 작업을 수행합니다. 
    폼을 제출하면 비동기적으로 데이터를 서버에 보내고, 
    서버 응답을 처리합니다.*/ }


import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component { //CustomerAdd는 React 클래스 컴포넌트입니다
    constructor(props) {            //constructor(props)는 생성자 함수로, 컴포넌트가 생성될 때 실행됩니다.
        super(props);
        this.state = {              //this.state는 컴포넌트의 상태를 정의합니다. 초기 값으로 파일, 사용자 이름, 생년월일, 성별, 직업, 파일 이름을 설정합니다.
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        };
    }

    handleFormSubmit = async (e) => {  //handleFormSubmit는 폼이 제출될 때 실행되는 함수입니다.
        e.preventDefault();            //e.preventDefault()는 폼이 실제로 제출되는 것을 방지하고, 사용자 정의 동작을 수행하게 합니다.

        //this.addCustomer()
        const response = await this.addCustomer()  // axios 요청을 기다림, this.addCustomer()는 고객을 추가하는 함수입니다. await를 사용하여 비동기 요청이 완료될 때까지 기다립니다.
            .then((response) => {                  //성공하면 response.data를 콘솔에 출력하고, 성공 알림을 띄웁니다.
                console.log(response.data);

            })
            .catch((error) => {                   //실패하면 오류를 콘솔에 출력하고, 오류 메시지를 알림창으로 띄웁니다.
                console.error("오류났어요!! Error adding customer:", error);
                alert('안녕하세요! 333-22::' + error);
            })

        this.setState({                      //비동기 작업이 완료된 후 상태를 초기화합니다. 입력된 폼 데이터를 모두 초기화합니다.
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })

        window.location.reload();   //상태를 초기화한 후 페이지를 새로 고칩니다. 폼이 비워지고, 새로 시작되는 상태로 돌아갑니다.
    }

    handleFileChange = (e) => {       //handleFileChange는 사용자가 파일을 선택할 때 실행됩니다. 
        this.setState({               //파일 객체와 파일 이름을 상태로 설정합니다.
            file: e.target.files[0],  // 파일 객체
            fileName: e.target.files[0].name   // 파일 이름
        });
    }

    handleValueChange = (e) => {     //handleValueChange는 사용자 입력에 따라 상태를 업데이트합니다.
        let nextState = {};
        nextState[e.target.name] = e.target.value;   //e.target.name을 사용하여 입력 필드의 이름에 맞는 상태를 동적으로 업데이트합니다.
        this.setState(nextState);
    }

    addCustomer = () => {     //addCustomer는 서버로 데이터를 전송하는 함수입니다., API의 URL을 지정하고, formData에 필요한 데이터를 첨부합니다.
        alert('addCustomer! 444-1');
        const url = 'http://localhost:5000/api/customers'; // API의 절대 경로로 변경
        const formData = new FormData();               //FormData를 사용하여 폼 데이터를 생성하고, 파일과 사용자 정보를 추가합니다.
        formData.append('image', this.state.file);     // 파일 데이터
        formData.append('name', this.state.userName);  // 사용자 이름
        formData.append('birthday', this.state.birthday);  // 생년월일
        formData.append('gender', this.state.gender);  // 성별
        formData.append('job', this.state.job);        // 직업
        alert('addCustomer! 444-2');

        const config = {                    //config는 HTTP 요청에 필요한 헤더를 설정합니다.
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        alert('addCustomer! 444-3');
        return axios.post(url, formData, config);   // axios 요청 반환   //axios.post()를 사용하여 서버로 formData를 전송합니다. 이 함수는 Promise를 반환합니다.
    }

    render() {   //render 함수는 컴포넌트의 UI를 렌더링합니다.
        return (
            <form onSubmit={this.handleFormSubmit}>     {/*onSubmit 이벤트가 발생하면 handleFormSubmit이 호출됩니다. 폼 필드에 입력된 값들이 상태에 바인딩되어, 사용자가 입력한 값이 this.state에 반영됩니다. */}
                <h1>고객추가</h1>
                프로파일이미지: <input type="file" name="file" onChange={this.handleFileChange} /> <br />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br />
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /> <br />
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> <br />
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;