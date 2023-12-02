import '../style/game/CardView.css' 

const CardView = ({id}) => {
    return (
        <p className='CardView'> {String.fromCodePoint(id)} </p>
    )
}

export {CardView}