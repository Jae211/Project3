import '../../../style/Search.css';

export default function itemInfo(props) {
    return (
        <div className='ItemInfo'>
            <div id='ItemImage'><img id='ItemImage' src={props.image} alt='상품 이미지'></img></div>
            <div id='ItemTitle'>{props.title}</div>
            <div id='ItemPrice'>{props.price}</div>
        </div>
    )
}