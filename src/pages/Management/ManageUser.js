import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../../components/Header";
import "../../style/Management.css"

export default function ManageUser() {
    const [User, SetUser] = useState([{
        user_id: '',
        user_nickname: '',
        user_name: '',
        user_reliable: '',
    }]);

    useEffect(()=>{
        Axios.get('http://localhost:8080/manager/user')
        .then((res)=>{
            console.log(res.data);
            SetUser(res.data);
        });
    },[]);

    function ListItem(props){
        return (
            <tr className="ListRow">
                <td className="UserId">{props.UserId}</td>
                <td className="UserNickname">{props.Nickname}</td>
                <td className="UserName">{props.UserName}</td>
                <td className="UserReliable">{props.UserReliable}</td>
                <td className="ChangeReliable">
                    <input className="InputReliable"/>
                    <button className="SubmitReliable">확인</button>
                </td>
                <td className="PermanentBan">
                    <button className="BanButton">영정</button>
                </td>
            </tr>
        );
    };

    let UserList = [];
    for(let i=User.length-1; i>=0; i--){
        UserList.push(
            <ListItem UserId={User[i].user_id} Nickname={User[i].user_nickname}
            UserName={User[i].user_name} UserReliable={User[i].user_reliable}/>
        );
    }

    return (
        <div>
            <Header />
            <div className="ManageMain">
                <table className="UserList">
                    <thead className="UserHead">
                        <tr>
                            <td className="UserId">아이디</td>
                            <td className="UserNickname">닉네임</td>
                            <td className="UserName">이름</td>
                            <td className="UserReliable">신뢰도</td>
                            <td className="ChangeReliable">신뢰도 조정</td>
                            <td className="PermanentBan">영구 정지</td>
                        </tr>
                    </thead>
                    <tbody>
                        {UserList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}