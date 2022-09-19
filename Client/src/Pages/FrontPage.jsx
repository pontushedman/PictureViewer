import CategoryTitle from "../Components/CategoryTitle";

function FrontPage(props) {
  return (
    <div className="mainContainer">
      <CategoryTitle
        noAdd={true}
        small={false}
        category="albums"
        title="Albums"
        image="albums"
        showModal={props.showModal}
      />
      <CategoryTitle
        noAdd={true}
        small={true}
        category="images"
        title="Images"
        image="images"
        showModal={props.showModal}
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