import React from 'react';
import axios from 'axios';


class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        };
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        alert('안녕하세요! 333-1');

        //this.addCustomer()
        const response = await this.addCustomer()  // axios 요청을 기다림
            .then((response) => {
                console.log(response.data);
                alert('안녕하세요! 333-2');
            })
            .catch((error) => {
                console.error("오류났어요!! Error adding customer:", error);
                alert('안녕하세요! 333-22::'+error);
            })
alert('안녕하세요! 333-3');
            this.setState({
                file: null,
                userName:'',
                birthday:'',
                gender:'',
                job:'',
                fileName:''
            })
alert('안녕하세요! 333-4');
            window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],  // 파일 객체
            fileName: e.target.files[0].name   // 파일 이름
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        alert('addCustomer! 444-1');
        
        const url = 'http://localhost:5000/api/customers'; // API의 절대 경로로 변경
        const formData = new FormData();
        formData.append('image', this.state.file);  // 파일 데이터
        formData.append('name', this.state.userName);  // 사용자 이름
        formData.append('birthday', this.state.birthday);  // 생년월일
        formData.append('gender', this.state.gender);  // 성별
        formData.append('job', this.state.job);  // 직업
        alert('addCustomer! 444-2');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        alert('addCustomer! 444-3');
        return axios.post(url, formData, config);  // axios 요청 반환
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로파일이미지: <input type="file" name="file" onChange={this.handleFileChange} /> <br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /> <br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> <br/>
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;
