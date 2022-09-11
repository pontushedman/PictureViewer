import Header from "./Header";
import CategoryTitle from "./CategoryTitle";
import Modal from "./Modal";
import Footer from "./Footer"

function FrontPage(props) {
    return (
        <div className="mainContainer">
            <CategoryTitle
            noAdd={true}
            small={false}
            category="albums"
            title="Albums"
            image="albums"
            showModal={props.setOpenModal}
            />
            <CategoryTitle
            noAdd={true}
            small={true}
            category="images"
            title="Images"
            image="images"
            showModal={props.setOpenModal}
            />
            <CategoryTitle
            noAdd={false}
            small={true}
            category="favorites"
            title="Favorites"
            image="favorites"
            />
      </div>
    )
}

export default FrontPage