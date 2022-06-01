import '../../../style/search.css';

export default function itemInfo(props) {
    return (
        <div className='itemInfo'>
            <div id='itemImage'><img src={props.image} alt='상품 이미지'></img></div>
            <div id='itemTitle'>{props.title}</div>
            <div id='itemPrice'>{props.price}</div>
        </div>
    )
}