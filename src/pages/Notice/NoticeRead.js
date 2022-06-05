import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import Header from "../../components/Header"

export default function NoticeRead(){  
    let Navigate = useNavigate();
    let Location = useLocation();

    // 관리자인지 확인 필요
    var IsManager = true;
    const Date = IsManager ? '수정 날짜' : '작성 날짜';
    
    // 관리자라면 수정 날짜 받아오기
    if(IsManager){
        var now = moment();
        var UpdateDate = now.format('YYYY-MM-DD');
    }
    
    // 공지사항 정보
    const [ManagerId, SetManagerId] = useState('');
    const [NoticeDate, SetNoticeDate] = useState('');
    const [NoticeTitle, SetNoticeTitle] = useState('');
    const [NoticeContent, SetNoticeContent] = useState('');
    const [NoticeImg, SetNoticeImg] = useState('');

    // location의 pathname으로부터 noticd_id 얻기
    useEffect(()=>{
        console.log('location', Location);
    }, [Location]);
    const NoticeId = Location.pathname.split('/').slice(-1)[0];

    // 공지사항 정보 불러오기
    useEffect(()=>{
        Axios.get('http://localhost:8080/notice/read/'+NoticeId)
        .then((res)=>{
            console.log(res.data);
            SetManagerId(res.data[0].manager_id);
            SetNoticeDate(res.data[0].notice_date);
            SetNoticeTitle(res.data[0].notice_title);
            SetNoticeContent(res.data[0].notice_content);
            SetNoticeImg(res.data[0].notice_img);
        });
    },[NoticeId]);

    // 공지사항 수정
    const UpdateClick = ()=>{
        if(window.confirm("해당 내용으로 수정하시겠습니까?") === true){ 
            Axios.post("http://localhost:8080/notice/update", {
                notice_id: NoticeId,
                notice_date: UpdateDate,
                notice_title: NoticeTitle,
                notice_content: NoticeContent,
                notice_img: NoticeImg,
            }).then((res)=>{
                console.log(res);
                if(res.data === true)
                    Navigate(-1);
                else{
                    alert("공지사항 수정 실패");
                    Navigate(-1);
                }
            });
        }
    }

    // 공지사항 삭제
    const DeleteClick = ()=>{
        if(window.confirm("정말 삭제하시겠습니까?") === true){ 
            Axios.post("http://localhost:8080/notice/delete", {
            notice_id: NoticeId,
            }).then((res)=>{
                console.log(res);
                if(res.data === true)
                    Navigate(-1);
                else{
                    alert("공지사항 삭제 실패");
                    Navigate(-1);
                }
            });
        }        
    }

    // 목록으로 돌아가기
    const ListClick = ()=>{
        Navigate(-1);
    }

    return (
        <div>
            <Header detail='공지사항'/>
            <main className="noticeMain">
                <table className="noticeRead">
                    <tr className="n_row">
                        <th className="n_th">제목</th>
                        <td><input className="n_td" type='text' value={NoticeTitle} readOnly={!IsManager} onChange={(event) => SetNoticeTitle(event.target.value)}/></td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">{Date}</th>
                        <td><input className="n_td" type='text' value={IsManager?UpdateDate:NoticeDate} readOnly/></td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">작성자</th>
                        <td><input className="n_td" type='text' value={ManagerId} readOnly/></td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">내용</th>
                        <td>
                            <textarea className="n_td_content" value={NoticeContent} readOnly={!IsManager} onChange={(event) => SetNoticeContent(event.target.value)}/>
                        </td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">이미지</th>
                        <td><img className="n_td_image" src={NoticeImg} alt="이미지"/></td>
                        {/* 이미지 왜 안나와??? 와이???????? */}
                    </tr>
                </table>
                <div className="buttons">
                    <button className="list" type="button" onClick={ListClick}>목록</button>
                    <button className="update" type="button" hidden={!IsManager} onClick={UpdateClick}>수정하기</button>
                    <button className="delete" type="button" hidden={!IsManager} onClick={DeleteClick}>삭제하기</button>
                </div>
            </main>
        </div>
    )
}