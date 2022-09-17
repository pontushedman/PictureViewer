import styles from "./Styles/AddCategory.module.css";

function AddCategory(props) {
  const content = () => {
    if (props.noAdd === true) {

      const mode = (() => {
        let cat = ""
        props.category === "images" ? cat = "addimages" : null
        props.category === "albums" ? cat = "addalbum" : null
        return cat
      })

      return (
        <div className={styles.AddCategory} onClick={() => { props.showModal({ show: true, mode: mode(), image: {} }) }}>
          <img className={styles.Plus} src="./src/assets/plus.png" />
          <div className={styles.Text}>Add {props.category}</div>
        </div>
      )
    } else {
      return <div />
    }
  }

  return content();
}

export default AddCategory;
