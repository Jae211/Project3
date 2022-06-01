// import { useState, useEffect } from "react";
// import axios from 'axios';
import Header from "../../components/header"
import ItemInfo from "./components/itemInfo";

export default function SEARCH(){
    return (
        <div>
            <div className='head'>
                <Header detail='판매'/>
            </div>
            <div className="main">
                <div className="descript"><button id="writeButton" type="button">판매글쓰기</button></div>
                <div>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='당근 팔아요' price='10,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='오이 팔아요' price='15,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='가지 팔아요' price='20,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='딸기 팔아요' price='25,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='비트 팔아요' price='30,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='당근 팔아요' price='10,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='오이 팔아요' price='15,000원'/>
                    <ItemInfo image='`${process.env.PUBLIC_URL}/prod09.png`' title='가지 팔아요' price='20,000원'/>
                </div>
            </div>
        </div>
    )
}