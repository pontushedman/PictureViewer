import CategoryTitle from "../Components/CategoryTitle";
import styles from './Styles/FrontPage.module.css';

function AlbumsPage(props) {
  return (
    <div className={styles.mainContainer}>
      <CategoryTitle
        noAdd={true}
        small={false}
        category="albums"
        title="Albums"
        image="albums"
        showModal={props.showModal}
        expand={false}
      />
    </div>
  )

}
export default AlbumsPage