import '../style/game/CardView.css' 

const CardView = ({id, color}) => {
    return (
        <p 
            className='CardView'
            style={{
                color: color
            }}
        > 
            {String.fromCodePoint(id)} 
        </p>
    )
}

export {CardView}