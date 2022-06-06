import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header";
import "../../style/Management.css"

export default function ManageReport() {
  let Navigate = useNavigate();
  
  const [Report, SetReport] = useState([{
    report_id: '',
    report_type: '',
    report_title: '',
    reporter_id: '',
    report_date: '',
    solve_id: '',
  }]);    

  useEffect(()=>{
      Axios.get('http://localhost:8080/manager/report')
      .then((res)=>{
          console.log(res.data);
          SetReport(res.data);
      });
  },[]);

  function ListItem(props){
    const ToReport = ()=>{
      Navigate('/report/detail/'+props.reportid);
    }
    
    return (
      <tr className="ListRow" onClick={ToReport}>
        <td className="ReportId">{props.reportid}</td>
        <td className="ReportType">{props.type}</td>
        <td className="ReportTitle">{props.title}</td>
        <td className="ReporterId">{props.reporterid}</td>
        <td className="ReportDate">{props.date}</td>
        <td className="IsSolved"><div className={props.issolved}>{props.issolved==='Complete' ? '완료' : '미완료'}</div></td>
      </tr>
    );
  };

  let UserList = [];
  for(let i=Report.length-1; i>=0; i--){
      let IsSolved = 'Incomplete';
      if(Report[i].solve_id !== null)
          IsSolved ='Complete';
      UserList.push(
          <ListItem key={i} reportid={Report[i].report_id} type={Report[i].report_type} title={Report[i].report_title}
          reporterid={Report[i].reporter_id} date={Report[i].report_date} issolved={IsSolved}/>
      );
  }

  return (
      <div>
          <Header />
          <div className="ManageMain">
              <table className="ReportList">
                  <thead className="ReportHead">
                      <tr>
                          <td className="ReportId">번호</td>
                          <td className="ReportType">유형</td>
                          <td className="ReportTitle">제목</td>
                          <td className="ReporterId">작성자</td>
                          <td className="ReportDate">작성 날짜</td>
                          <td className="IsSolved">해결 여부</td>
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