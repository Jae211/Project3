import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"
import ReportListComponent from "./components/ReportListComponent";
import "../../style/Report.css"

export default function ReportBoard(){    
  // 아이디 받아와야 해요
  const ReporterId = 'sy02lee';

  // 신고 내역 정보
  const [Report, SetReport] = useState([{
      report_id: '',
      report_type: '',
      report_title: '',
      report_date: '',
      solve_id: '',   // 신고 해결 여부 확인을 위해

  }]);

  useEffect(()=>{
      Axios.post('http://localhost:8080/report',{
          reporter_id: ReporterId,
      })
      .then((res)=>{
          console.log(res.data);
          SetReport(res.data);
      });
  },[]);

  let ReportList = [];
  if(Report.length === 0){
      ReportList.push(<tr key={0} className="r_list_row"><td colSpan='5'>신고 내역이 존재하지 않습니다.</td></tr>)
  }
  else{
      for(let i=Report.length-1; i>=0; i--){    
          ReportList.push(
              <ReportListComponent key={i} report_id={Report[i].report_id} report_type={Report[i].report_type} report_title={Report[i].report_title}
              report_date={Report[i].report_date.toString().split('T')[0]} is_solved={Report[i].solve_id !== null ? '완료' : '미완료'}/>
          );
      }
  }

  return (
    <div>
      <Header props={'내 신고 내역'}/>
      <main className="reportMain">
        <div className="myReportInfo">
          <p>
            {ReporterId}님이 작성한 신고 내역입니다.<br></br>
            빠른 시일 내에 해결해드리도록 하겠습니다.😊
          </p>
        </div>
        <table className="myReportList">
          <thead className="reportHead">
            <tr>
              <td className="reportIndex">신고번호</td>
              <td className="reportType">유형</td>
              <td className="reportTitle">제목</td>
              <td className="reportDate">작성날짜</td>
              <td className="isSolved">해결여부</td>
            </tr>
          </thead>
          <tbody>
            {ReportList}
          </tbody>
        </table>
      </main>
    </div>
  );
}