import styles from "./Styles/AddCategory.module.css";

function AddCategory(props) {
  const content = () => {
    if (props.noAdd === true) {
      return (
        <div className={styles.AddCategory} onClick={() => { props.showModal({show: true, mode: "addimages", image: {}}) }}>
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
