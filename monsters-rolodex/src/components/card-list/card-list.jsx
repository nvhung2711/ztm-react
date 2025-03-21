import Card from '../card/card.jsx';
import './card-list.css'

const CardList = ({ monsters }) => {
    return(
        <div className='card-list-container'>
            {
                monsters.map(({name, email, id}, idx) => {
                    return <Card key={`${name}-${idx}`} name={name} email={email} id={id}/>
                })
            }
        </div>
    )
}

export default CardList;