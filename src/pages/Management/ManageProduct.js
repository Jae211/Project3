import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../../components/Header";
import "../../style/Management.css"

export default function ManageProduct() {

    const [Product, SetProduct] = useState([{
        product_id: '',
        writer_id: '',
        product_category: '',
        product_title: '',
        product_price: '',
        report_id: '',
    }]);

    useEffect(()=>{
        Axios.get('http://localhost:8080/manager/product')
        .then((res)=>{
            console.log(res.data);
            SetProduct(res.data);
        });
    },[]);

    function ListItem(props){
        return (
            <tr className="ListRow">
                <td className="ProductIndex">{props.ProductId}</td>
                <td className="ProductWriter">{props.WriterId}</td>
                <td className="ProductCategory">{props.Category}</td>
                <td className="ProductTitle">{props.Title}</td>
                <td className="ProductPrice">{props.Price}</td>
                <td className="DeleteProduct">
                    <button className="DeleteBtn">삭제</button>
                </td>
            </tr>
        );
    };

    let ReportedList = [];
    let ProductList = [];
    for(let i=Product.length-1; i>=0; i--){
        if(Product[i].report_id !== null){
            ReportedList.push(
                <ListItem key={i} ProductId={Product[i].product_id} WriterId={Product[i].writer_id}
                Category={Product[i].product_category} Title={Product[i].product_title} Price={Product[i].product_price}/>
            );
        }
        ProductList.push(
            <ListItem key={i} ProductId={Product[i].product_id} WriterId={Product[i].writer_id}
            Category={Product[i].product_category} Title={Product[i].product_title} Price={Product[i].product_price}/>
        );
    }


    return (
        <div>
            <Header />
            <div className="ManageMain">
                <table className="ReportedProduct">
                    <caption>신고 접수된 게시글</caption>
                    <thead className="ProductHead">
                        <tr>
                            <td className="ProductIndex">글 번호</td>
                            <td className="ProductWriter">글 작성자</td>
                            <td className="ProductCategory">카테고리</td>
                            <td className="ProductTitle">제목</td>
                            <td className="ProductPrice">가격</td>
                            <td className="DeleteProduct">글 삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ReportedList}
                    </tbody>
                </table>
                <table className="ProductList">
                    <caption>전체 게시글</caption>
                    <thead className="ProductHead">
                        <tr>
                            <td className="ProductIndex">글 번호</td>
                            <td className="ProductWriter">글 작성자</td>
                            <td className="ProductCategory">카테고리</td>
                            <td className="ProductTitle">제목</td>
                            <td className="ProductPrice">가격</td>
                            <td className="DeleteProduct">글 삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ProductList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}