import styles from "./Styles/AddCategory.module.css";
import App from "../App";

function AddCategory(props) {

  const content = () => {
    if (props.noAdd === true) {
      return (
        <div className={styles.AddCategory} onClick = {() => {props.showModal(true)}}>
          <img className={styles.Plus} src="./src/assets/plus.png" />
          <div className={styles.Text}>Add {props.category}</div>          
        </div>
      );
    } else {
      return <div />;
    }
  };

  /*     const ny = (() => {
        return "apa"
    }); */

  return content();
}

export default AddCategory;

// hej
