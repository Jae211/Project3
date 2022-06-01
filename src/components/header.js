export default function Header(props){
    return (
        <div className='header'>
            <div className='header2'>
                <div className="header2Content">로그인</div>
                <div className="header2Content">회원가입</div>
                <div className="header2Content">고객센터</div>
            </div>
            <div className='title'>
                <div id='name'>
                    <div className="market_name">리치마켓</div>
                    <div className='detail_name'>{props.detail}</div>
                </div>
                <div id='nav'>
                    <div className='navContent'>판매</div>
                    <div className='navContent'>구매</div>
                    <div className='navContent'>내정보</div>
                    <div className='navContent'>쪽지함</div>
                </div>
            </div>
        </div>
    )
}