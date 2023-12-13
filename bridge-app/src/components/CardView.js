import '../style/game/CardView.css' 

const CardView = ({id, color, rotate, marginTop, fontSize}) => {
    return (
        <p 
            className='CardView'
            style={{
                color: color,
                transform: rotate,
                marginTop: marginTop,
                fontSize: fontSize,
            }}
        > 
            {String.fromCodePoint(id)} 
        </p>
    )
}

export {CardView}