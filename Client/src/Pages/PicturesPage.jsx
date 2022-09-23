import CategoryTitle from "../Components/CategoryTitle";
import styles from './Styles/FrontPage.module.css';

function PicturesPage(props) {
  return (
    <div className={styles.mainContainer}>
      <CategoryTitle
        noAdd={true}
        small={true}
        category="images"
        title="Images"
        image="images"
        showModal={props.showModal}
        expand={false}
      />
    </div>
  );
}

export default PicturesPage;
