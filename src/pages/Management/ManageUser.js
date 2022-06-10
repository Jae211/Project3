import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header";
import "../../style/Management.css"

export default function ManageUser() {
  let Navigate = useNavigate();

  const [User, SetUser] = useState([{
    user_id: '',
    user_nickname: '',
    user_name: '',
    user_reliable: '',
  }]);
  const [SearchWord, SetSearchWord] = useState('');

  useEffect(()=>{
    Axios.get('http://localhost:8080/manager/user')
    .then((res)=>{
      console.log(res.data);
      SetUser(res.data);
    });
  },[]);

  function ListItem(props){
    const [Reliable, SetReliable] = useState(0);

    // 신뢰도 조정 클릭
    const ReliableClick = ()=>{
      if(Reliable >= 100 || Reliable < 0){
        alert("적절하지 않은 신뢰도입니다. 다시 입력해주세요.");
        Navigate('/manager/user');
      }
      else{
        if(window.confirm(props.userid+"님의 신뢰도를 '"+Reliable+"'(으)로 조정하시겠습니까?")===true){
          Axios.post("http://localhost:8080/manager/user/reliable",{
            user_id: props.userid,
            user_reliable: Reliable,
          }).then((res)=>{
            console.log(res);
            if(res.data === true)
              window.location.reload();
            else{
              alert("신뢰도 조정에 오류가 발생하였습니다.");
              Navigate('/manager/user');
            }
          });
        }
      }
    };

    // 영구정지 클릭
    const BanClick = ()=>{
      if(window.confirm(props.userid+"님을 영구 정지하시겠습니까?")===true){
        Axios.post("http://localhost:8080/manager/user",{
          user_id: props.userid,
        }).then((res)=>{
          console.log(res);
          if(res.data === true)
            window.location.reload();
          else{
            alert("영구 정지에 오류가 발생하였습니다.");
            Navigate('/manager/user');
          }
        });
      }
    };

    return (
      <tr className="ListRow">
        <td className="UserId">{props.userid}</td>
        <td className="UserNickname">{props.nickname}</td>
        <td className="UserName">{props.username}</td>
        <td className="UserReliable">{props.reliable}</td>
        <td className="ChangeReliable">
          <input className="InputReliable" onChange={(e)=>SetReliable(e.target.value)}/>
          <button className="SubmitReliable" onClick={ReliableClick}>확인</button>
        </td>
        <td className="PermanentBan">
          <button className="BanButton" onClick={BanClick}>영정</button>
        </td>
      </tr>
    );
  };

  let UserList = [];
  for(let i=User.length-1; i>=0; i--){
    UserList.push(
      <ListItem key={i} userid={User[i].user_id} nickname={User[i].user_nickname}
      username={User[i].user_name} reliable={User[i].user_reliable}/>
    );
  }

  return (
    <div>
      <Header keyword="회원 관리"/>
      <div className="ManageMain">
        <table className="UserList">
          <thead className="UserHead">
            <tr className="ListRow">
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
        <div className="ManageBottom">
          <div className="ManageSearch">
            <input type="text" onChange={e=>SetSearchWord(e.target.value)}></input>
            <button type="button">검색</button>
          </div>
          <div>
            <Link to="/manager/user">
              <button className="AllList" type="button" hidden={SearchWord===''}>전체 목록</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}