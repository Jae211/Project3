import { Link } from "react-router-dom";
import getCookie from "../../../components/GetCookie";

export default function QnAListComponent(props){
  const uid = props.userid;
  const qid = props.q_id;
  let matchUser = false;
  if(uid === qid){
    matchUser = true;
  }

  return (
    <tr className="q_list_row">
      {/* 조회수 카테고리 제목 날짜 공개여부 답변여부 */}
      <td className="qnaView">{props.qna_view}</td>
      <td className="qnaCategory">{props.qna_category}</td>
      {matchUser ? <td className="qnaTitle">
        <Link to={{pathname:'/qna/read/'+props.qna_id}} id='LinkNoLine'>{props.qna_title}</Link></td> 
        : <td className="qnaTitle">{props.qna_title}</td>
      }
      <td className="qnaDate">{props.qna_date}</td>
      <td className="qnaPflag">{props.qna_pflag}</td>
      <td className="qnaAnswered">{props.qna_answered}</td>
    </tr>
  )
}