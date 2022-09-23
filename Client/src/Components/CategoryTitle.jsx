import React, { useEffect, useContext } from 'react'
import AddCategory from './AddCategory'
import styles from './Styles/CategoryTitle.module.css'
import ContentAmount from './ContentAmount'
import { Link } from 'react-router-dom'
import JSONContext from '../Store/JSONContext'


function CategoryTitle(props) {
  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.AlbumsList
  const ratedAlbums = JSONCtx.RatedAlbumList;

  const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
  };

  useEffect(() => {
    //console.log("CategoryTitle rendered")
  })

  function openImage(e) {
    const imageId = e.target.dataset.id
    const obj = { show: true, mode: "image", id: imageId }
        props.showModal(obj)
        window.scrollTo(0, 0)
        document.body.style.overflowY = "hidden"
        

     
  }

  function openAlbum(e) {
    const albumId = e.target.dataset.id
    const obj = { show: true, mode: "album", id: albumId }
    props.showModal(obj)
    window.scrollTo(0, 0)
    document.body.style.overflowY = "hidden"
  }

  function openRatedAlbum(e) {
    const rating = e.target.dataset.rating
    console.log('parse this shit - ' + rating);
    const obj = { show: true, mode: "ratedAlbum", id: parseInt(rating) };
    props.showModal(obj)
    window.scrollTo(0, 0)
    document.body.style.overflowY = "hidden"
  }

  const albumCount = albums.length
  const imageCount = (() => {
    let count = 0
    albums.map(album => { count += album.pictures.length})
    return count
  })

  const availableCategories = ["albums", "images", "favorites"]
  const category = props.category
  let categoryCheck = false

  availableCategories.map(x => { x === category ? categoryCheck = true : null })

  if (categoryCheck === false) {
    console.debug("Invalid category input")
    return (<div key={uniqueId()}/>)
  }

  const image = "./src/assets/" + props.image + ".png"
  let categoryImage = props.small ? styles.categoryImageSmall : styles.categoryImageLarge

  const ContentCount = (() => {
    if (category === "albums") return albumCount
    if (category === "images") return imageCount()
    return ""
  })

  function Top() {
    return (
      <div className={styles.CategoryTitle}>
        <img className={categoryImage} src={image} />
        <p className={styles.Title}>{props.title}</p>
        <AddCategory showModal={props.showModal} noAdd={props.noAdd} category={props.category} key={uniqueId()} />
        <div className={styles.hide}>
          <ContentAmount suffix={category} count={ContentCount()} className={styles.Count} key={uniqueId()}/>
        </div>
      </div>
    )
  }

  function Bottom() {
    return (
      <div className={styles.ViewAll}>
        <Link className={styles.categoryLink} to={"./" + props.title}> View all {props.title}</Link>
      </div>
    )
  }

  function Albums() {
    if (albums === undefined) {
      return "Loading";
    }
    return (
      <div className={styles.Albums}>
        {albums.map(x =>
          <div 
            onClick={(e => {
              openAlbum(e)
            })}
            key={x.id + 1} 
            className={styles.Album}
            data-id={x.id}
            >
            
            <img 
              key={x.id + 2}
              onClick={(e => {
                openAlbum(e)
              })}

              className={styles.AlbumHeaderImage}
              data-id={x.id}
              src={"http://localhost:3000/" + x.headerImage}
            />
            <p key={x.id + 3} className={styles.AlbumTitle} onClick={(e => {openAlbum(e)})} data-id={x.id}>{x.title}</p>
            <p key={x.id + 4} className={styles.AlbumImageCount}onClick={(e => {openAlbum(e)})}data-id={x.id}>{x.pictures.length} Pictures</p>
          </div>)}
      </div>
    )
  }

  function Images() {
    if (albums === undefined) {
      return "Loading";
    }
    return (
      <div className={styles.Images}>
        {
          albums.map(x =>
            x.pictures.map(y =>
              <div 
                key={uniqueId()} 
                //className={styles.Image}
                data-id={y.id}
                onClick={(e => {openImage(e)})}
              >
                <img key={uniqueId()}
                  className={styles.PictureImage}
                  data-id={y.id}
                  src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes} />
              </div>
            )
          )
        }
      </div>
    )
  }

  function RatedAlbums() {
    if (albums === undefined) {
      return "Loading";
    }

    function StarPrinter (props) {
      let  final = [];
      for(let i = 0; i < props.rating; i++)
      {
        final.push(<img 
          key={uniqueId()} 
          src="./src/assets/star_filled.svg"
          onClick={(e => {openRatedAlbum(e)})} 
          data-rating={props.rating}
          />);
      }
      return final;
    }

    return (
      <div className={styles.RatedAlbums}>
        {ratedAlbums.map((x, index) =>
          <div onClick={(e => {openRatedAlbum(e)})} key={uniqueId()} className={styles.RatedAlbum} data-rating={x.rating}>
              <div onClick={(e => {openRatedAlbum(e)})} key={uniqueId()} className={styles.RatedAlbumRating} data-rating={x.rating}>
                <div onClick={(e => {openRatedAlbum(e)})} key={uniqueId()} data-rating={x.rating}>
                  <StarPrinter rating={x.rating}/>
                </div>
                <p onClick={(e => {openRatedAlbum(e)})} className={styles.AlbumImageCount}key={uniqueId()} data-rating={x.rating}>{x.pictures.length} Pictures</p>
              </div>
          </div>)
          
          }
      </div>
    )
  }

  let cat = (() => {
    if (category === "albums") {
      return <Albums />
    } else if (category === "images") {
      return <Images />
    } else if (category === "favorites") {
      return <RatedAlbums />
    }
  })

  return (
    <div className={styles.CategoryContainer}>
      <Top />
      {cat()}
      <Bottom />
    </div>
  )
}

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
}

export default CategoryTitle