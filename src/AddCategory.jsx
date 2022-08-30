import styles from './AddCategory.module.css'

function AddCategory(props) {
    return (
        <div className={styles.AddCategory}>
            <img className={styles.Plus} src="./src/assets/plus.png"/>
            <p className={styles.Text}>Add {props.category}</p>
        </div>
    )
}

export default AddCategory