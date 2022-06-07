import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios';
import Header from "../../components/Header";
import ProductCategory from "../../components/ProductCategory";
import '../../style/ProductUpload.css';
import ImageUploading from 'react-images-uploading'

function ProductUpload(){

  const navigate = useNavigate();
  const location = useLocation();

  const inputid = 'idtest'; //location으로 받아옴
  const like = 0;
  const dealflag = 0;
  // const [sellerid, setSellerid] = useState('');
  // const [buyerid, setBuyerid] = useState('');
  let image_num = 0;
  let sellerid = '', buyerid = '';

  const [dealtype, setDealtype] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [dealmethod, setDealmethod] = useState('');
  const [image, setImage] = useState('');

  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');

  const goBack = () => {
    navigate(-1);
  }

  const onSubmit = () => {
    let now = new Date();
    let month = now.getMonth()+1;
    let date = now.getFullYear() + "-" + month + "-" + now.getDate()
    + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    if(dealtype === "0"){
      sellerid = inputid;
    } else {
      buyerid = inputid;
    }

    Axios.post('http://localhost:8080/productupload', {
      sellerid: sellerid,
      buyerid: buyerid,
      like: 0,
      image_num: image_num,
      dealflag: 0,
      dealtype: dealtype,
      title: title,
      category: category,
      price: price,
      detail: detail,
      dealmethod: dealmethod,
      image: image,
      date: date,
    }).then((res) => {            
      if(res.data !== false){
        alert("업로드 완료");
        const pid = res.data;
        navigate('./product/'+pid);
      }
      else {
        alert("업로드 실패");
      }
    })
  }

  const pricecheck = (data) => {
    var regExp = /^[0-9]+$/;
    return regExp.test(data);
  }

  useEffect(() => {
    if (
      dealtype === "" ||
      title === "" ||
      category === "" ||
      price === "" ||
      dealmethod === "" ||
      detail === ""
    ) {
      setError(true);
      setErrormsg("필수 정보를 모두 입력해주세요.")
    } else if(title.length > 30){
      setError(true);
      setErrormsg("제목은 30자 이내로 작성해야 합니다.")
    } else if(!pricecheck(price)){
      setError(true);
      setErrormsg("가격은 숫자만 작성해야 합니다.")
    } else {
      setError(false);
    }
  }, [error, price, title, detail]);
  
  const changeDealtype = (e) => {
    setDealtype(e.target.value);
    // alert(e.target.value);
  }

  const changeDealmethod = (e) => {
    setDealmethod(e.target.value);
    // alert(e.target.value);
  }

  const changeCategory = (e) => {
    setCategory(e.target.value);
    //alert(e.target.value);
  }

  /* Report랑 동일한 방법 사용했을 때 - index나 pid처럼 다른 요소 전달 시 filename 못읽음 */
  //Cannot read properties of undefined (reading 'filename')
  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  }

  const ImgSubmit = () => {
    if(image){
      const formData = new FormData();
      formData.append("img", image);
      Axios.post('http://localhost:8080/uploadproductimg', 
      // { formData : formData,
      //   pid : 1,
      //   index : 0, }
      formData
      ).then(res => {
          const { fileName } = res.data;
          alert(fileName);
        })
      }
  }

  /* ImageUploading 태그 사용했을 때 - network error 500 발생함.. file 형태가 input으로 받아올때랑 다른건가 싶음 */
  // const [images, setImages] = useState([]);
  // const maxNumber = 4;

  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // };

  // const onError = (errors, files) => {
  //   if(errors.maxNumber) {
  //     alert("이미지는 4개까지만 첨부할 수 있습니다");
  //   }
  // }

  // const ImgSubmit = () => {
  //   //이미지 제외하고, imagenumber에는 length만큼 뽑아와서 넣음..
  //   //upload 완료하면 pid 가져와서 그거랑 이미지 index input으로 넣음..
  //   //for(var i=0; i<images.length; i++){
  //   if(images[0]){
  //     const formData = new FormData();
  //     formData.append("img", images[0]);
  //     Axios.post('http://localhost:8080/uploadproductimg', formData)
  //       .then(res => {
  //         const { fileName } = res.data;
  //         alert(fileName);
  //       })
  //     }
  //   //}
  // }
  
  return (
    <div className="main">
      <Header keyword="중고거래 글쓰기"/>
      {/* <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        onError={onError}			// 추가
        >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          //dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              //{...dragProps}
            >
            사진추가
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>수정</button>
                  <button onClick={() => onImageRemove(index)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <button onClick={ImgSubmit}>submit</button> */}
      <div className="newproduct">
        <table className="submitnewproduct">
            <tbody>
            <tr className="p_row">
              <th className="p_th">거래 종류 <span className="p_must">*</span></th>
              <td>
                <input type="radio" name="dealtype" value="0"
                onChange={changeDealtype}/>판매하기
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="dealtype" value="1"
                onChange={changeDealtype}/>구매하기
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">상품 이미지</th>
              <td>
                <input className="p_td_image" type="file"
                onChange={onImgChange}/>
                <button onClick={ImgSubmit}>이미지 submit</button>
              </td>
              
            </tr>
            
            <tr className="p_row">
              <th className="p_th">상품 제목 <span className="p_must">*</span></th>
              <td>
                <input className="p_td" type="text"
                placeholder="제목을 입력해주세요. (최대 30자)"
                onChange={(e) => setTitle(e.target.value)}/>
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">카테고리 <span className="p_must">*</span></th>
              <td>
                <ProductCategory setData={changeCategory}/>
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">상품 가격 <span className="p_must">*</span></th>
              <td>
                <input className="p_td_price" type="text"
                placeholder="숫자만 입력해주세요."
                onChange={(e) => setPrice(e.target.value)}/>
                <div className="won">원</div>
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">거래방식 <span className="p_must">*</span></th>
              <td>
                <input type="radio" name="dealmethod" value="직거래"
                onChange={changeDealmethod}/>직거래
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="dealmethod" value="택배거래"
                onChange={changeDealmethod}/>택배거래
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="dealmethod" value="둘 다"
                onChange={changeDealmethod}/>둘 다
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">설명 <span className="p_must">*</span></th>
              <td>
                <textarea className="p_td_content" type="text"
                onChange={(e) => setDetail(e.target.value)}/>
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        {error ? <div className="errmsgbox">
          <span className="regerrormsg">{errormsg}</span>
          </div> : <></>}
        <div className="buttons">
          <button className="back" type="button" onClick={goBack}>취소</button>
          { error ? <button className="Nsubmit" type="button">글쓰기</button>
          : <button className="submit" type="button" onClick={onSubmit}>글쓰기</button>}
        </div>
      </div>
    </div>
  )

}

export default ProductUpload;