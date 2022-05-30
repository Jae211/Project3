import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import SubmitBtn from "../../components/SubmitBtn";

import './Login.css'

function Login(){

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');  

  const onSubmit = () => {
    //axios.post //~DB에 정보넣기~
  }

  useEffect(() => {
    console.log(error);
    if (
      id === "" ||
      pw === ""
    ) {
      setError(true);
      setErrormsg("아이디와 비밀번호를 모두 입력해주세요.");
    } else {
      setError(false);
    }
  }, [error, id, pw]);

  return (
    <div className='main'>
      <div className="logo">
        <Link to="/">
          <div className="logoimg"/>
        </Link>
      </div>

      <div className='login'>
        <Input
          type={"text"}
          placeholder={"아이디"}
          value={id}
          setValue={setId}
        />
        <br/>
        <Input
          type={"password"}
          placeholder={"비밀번호"}
          value={pw}
          setValue={setPw}
        /><br/>
        <SubmitBtn
         onClick={onSubmit}
         text={"로그인"}
         disabled={error}
        /><br/>
      </div>

      <div className='linkbox'>
        <Link to="/findid" style={{ textDecoration: 'none' }}>
          <span className="linktext">아이디 찾기</span>
        </Link>
        &nbsp;<span>|</span>&nbsp;
        <Link to="/findpw" style={{ textDecoration: 'none' }}>
          <span className="linktext">비밀번호 찾기</span>
        </Link>
        &nbsp;
      </div>

      <div className='toregister'>
        <span className="descript">아직 리치마켓의 회원이 아니라면?</span>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <span className="descriptlink"> 회원가입</span>
        </Link>
      </div>
    </div>
  )
}

export default Login;