import react from 'react'
import CategoryTitle from './CategoryTitle'

function Category(props) {
    const image = "./src/assets/" + props.category + ".png"
    const title = props.title

    return (
        <div>
            <CategoryTitle noAdd={props.noAdd} category="album" title={title} image={image}/>
        </div>
    )
}

export default Category