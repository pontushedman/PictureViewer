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

      function openAddModal() {
        window.scrollTo(0, 0)
        document.body.style.overflowY = "hidden"
        props.showModal({ show: true, mode: mode(), image: {} })
      }

      return (
        <div className={styles.AddCategory} onClick={() => { openAddModal() }}>
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
