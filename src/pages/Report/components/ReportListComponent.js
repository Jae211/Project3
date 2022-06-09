import { Link } from "react-router-dom";

export default function ReportListComponent(props){
  return (
    <tr className="ReportListRow">
      <td className="ReportIndex">{props.report_id}</td>
      <td className="ReportType">{props.report_type}</td>
      <td className="ReportTitle"><Link to={{pathname:'/report/detail/'+props.report_id}}>{props.report_title}</Link></td>
      <td className="ReportDate">{props.report_date}</td>
      <td className="EsSolved">{props.is_solved}</td>
    </tr>
  );
}