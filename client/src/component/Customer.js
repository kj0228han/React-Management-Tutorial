import React, { Component } from "react";                    //React 라이브러리와 Component 클래스를 react 패키지에서 가져옵니다. 이 Component 클래스는 React에서 클래스로 컴포넌트를 작성할 때 사용됩니다.
import TableRow from '@mui/material/TableRow';               //Material-UI(MUI)에서 제공하는 TableRow 컴포넌트를 가져옵니다. 이 컴포넌트는 테이블에서 한 줄(row)을 나타내는 요소입니다.
import TableCell from '@mui/material/TableCell';             //Material-UI에서 제공하는 TableCell 컴포넌트를 가져옵니다. 이 컴포넌트는 테이블에서 한 셀(cell)을 나타내는 요소입니다.
import CustomerDelete from './CustomerDelete';

class Customer extends Component {                           //Customer라는 새로운 클래스를 정의하는 코드입니다. 이 클래스는 Component를 확장(상속)하여 React 컴포넌트로 동작합니다.
    render() {                                               //render() 메서드는 React 컴포넌트에서 UI를 정의하는 필수 메서드입니다. 이 메서드 안에서 JSX 코드(HTML 구조)를 반환합니다.
        return (                                             //render() 메서드에서 반환할 JSX 코드를 시작합니다.
            <TableRow>                                       {/*테이블의 한 행을 나타내는 TableRow 컴포넌트를 열고 있습니다. */}
                <TableCell>{this.props.id}</TableCell>       {/*TableCell 컴포넌트를 사용하여 테이블 셀을 정의하고, 해당 셀의 내용을 this.props.id로 설정합니다. 이 값은 Customer 컴포넌트를 사용할 때 부모로부터 전달된 id prop입니다. */}
                <TableCell><img src={this.props.image} alt='Random Image' style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></TableCell>   {/*두 번째 TableCell에서는 이미지를 표시하는 img 태그를 포함합니다. 이미지의 src 속성은 this.props.image로 설정되며, 부모 컴포넌트에서 전달된 이미지 URL을 사용합니다. 이미지 크기는 100px로 설정되며, objectFit: 'cover' 스타일은 이미지가 셀의 크기를 채우되 비율을 유지하며 잘리게 만듭니다.*/}
                <TableCell>{this.props.name}</TableCell>     {/*name prop을 사용하여 고객의 이름을 표시하는 테이블 셀을 생성합니다.*/}
                <TableCell>{this.props.birthday}</TableCell> {/*birthday prop을 사용하여 고객의 생일을 표시하는 테이블 셀을 생성합니다. */}
                <TableCell>{this.props.gender}</TableCell>   {/* gender prop을 사용하여 고객의 성별을 표시하는 테이블 셀을 생성합니다.*/}
                <TableCell>{this.props.job}</TableCell>      {/*job prop을 사용하여 고객의 직업을 표시하는 테이블 셀을 생성합니다. */}
                 <TableCell> <CustomerDelete  stateRefresh={this.props.stateRefresh} id = {this.props.id}/> </TableCell> 
            </TableRow>
        )
    }
}

export default Customer;