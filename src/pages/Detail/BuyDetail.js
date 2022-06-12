import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header2"
import '../../style/Detail.css';
import * as Common from "../../components/CommonFunc"
import getCookie from "../../components/GetCookie";

export default function BUYDETAIL(){
    const cookie = getCookie("is_login");
    var IsManager = false;
    var IsLogin = false;
    let userid = '';
    
    //로그인 정보
    if(cookie === "true"){
      userid = localStorage.getItem("user_id");
      if(userid !== null)
        IsLogin = true;
      else{
        const managerid = localStorage.getItem("manager_id");
        if(managerid !== null){
          IsManager = true;
          IsLogin = true;
        }
      }
    }

    const navigate = useNavigate();
    let Location = useLocation();

    // 물건 정보
    const [ProductId, SetProductId] = useState('');
    const [SellerId, SetSellerId] = useState('');
    const [ProductTitle, SetProductTitle] = useState('');
    const [ProductCategory, SetProductCategory] = useState('');
    const [ProductPrice, SetProductPrice] = useState(0);
    const [ProductLike, SetProductLike] = useState(0);
    const [ProductDate, SetProductDate] = useState('');
    const [ProductImg, SetProductImg] = useState('');
    const [ProductImgNum, SetProductImgNum] = useState(0);
    const [ProductDetail, SetProductDetail] = useState('');
    const [DealMethod, SetDealMethod] = useState('');
    const [DealType, SetDealType] = useState(0);
    const [DealFlag, SetDealFlag] = useState(0);
    const [SellerNick, SetSellerNick] = useState('');

    // production_id 얻기
    const ProdId = Location.pathname.split('/').slice(-1)[0];

    // 물건 세부정보 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/buy/detail/'+ProdId)
        .then((res) => {
            SetProductId(res.data[0].product_id);
            SetSellerId(res.data[0].buyer_id);
            SetProductTitle(res.data[0].product_title);
            SetProductCategory(res.data[0].product_category);
            SetProductPrice(res.data[0].product_price);
            SetProductLike(res.data[0].product_like);
            SetProductDate(res.data[0].product_date);
            SetProductImg(res.data[0].product_img);
            SetProductImgNum(res.data[0].product_img_num);
            SetProductDetail(res.data[0].product_detail);
            SetDealMethod(res.data[0].deal_method);
            if(res.data[0].deal_type === 1)  SetDealType('판매해요');
            else                            SetDealType('구매해요');
            if(res.data[0].deal_flag === 0)  SetDealFlag('거래중');
            else                            SetDealFlag('거래완료');
            SetSellerNick(res.data[0].seller_nickname);
        })   
    }, []);

    function ILikeIt() {
        axios.post('http://localhost:8080/ilikeit', { UserId: userid, ProdId: parseInt(ProdId) })
        .then((res) => {
            console.log("ilikeit 등록: ", res);
            if(res.data === false) {
                alert("즐겨찾기 등록에 실패했습니다.");
            } else if(res.data === "이미") {
                alert("이미 즐겨찾는 상품입니다.");
            } else {
                alert("즐겨찾기 등록에 성공했습니다.");
                window.location.reload();
            }
        });
    }

    function DeleteProduct() {
        if(window.confirm("게시글을 삭제할까요?")) {
            axios.post('http://localhost:8080/deleteproduct', { ProdId: parseInt(ProdId) })
            .then((res) => {
                alert("게시글이 삭제되었습니다.");
                navigate(-1);
            })
        }
    }

    return (
        <div>
            <div className='Head'>
                <Header/>
            </div>
            <div className="DetailMain">
                <div>
                    <div id="Category">카테고리 &gt; {ProductCategory}</div>
                    <div id="ImageDiv">
                        <img id='DetailItemImage' src={'/'+ProductImg} alt='상품 이미지'></img>
                    </div>
                    <div id="DetailDescription">
                        <div id="DetailItemTitle">{ProductTitle}</div>
                        <div>
                            <div id="DetailItemPrice">{Common.MoneyComma(ProductPrice)} 원</div>
                            <div id="DealFlag">{DealFlag}</div>
                        </div>
                        <div>
                            <div id="DealTypeDiv">거래방식</div>
                            <div id="DealType">{DealMethod}</div>
                        </div>
                        <div id="MoreInfo">
                            <div id="LikeDate">💜{ProductLike} | ⏰{ProductDate}</div>
                            <div id="ReportButton">📢신고하기</div>
                        </div>
                        <div hidden={userid === SellerId ? true : false}>
                            <button id="LikeButton" onClick={() => {ILikeIt();}}>찜하기</button>
                            <button id="MessageButton">쪽지하기</button>
                        </div>
                        <div hidden={userid === SellerId ? false : true}>
                            <button id="DeleteButton" onClick={DeleteProduct}>삭제</button>
                            <button id="EditButton" >수정</button>
                            <button id="CompleteButton" >거래완료</button>
                        </div>
                    </div>
                </div>
                
                <div id="Infos">
                    <div id="InfoTitle">판매자 정보</div>
                    <div id="Info">{SellerNick}</div><br></br>
                    <div id="InfoTitle">상품 설명</div>
                    <div id="Info">{ProductDetail}</div>
                </div>
            </div>
        </div>
    )
}