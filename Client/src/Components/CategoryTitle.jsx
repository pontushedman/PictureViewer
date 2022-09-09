import React , { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import styles from './Styles/CategoryTitle.module.css'
import ContentAmount from './ContentAmount'

function CategoryTitle(props) {
    const [loading, setLoading] = useState();
    const [albumCount, setAlbumCount] = useState("asf");
    const [imageCount, setImageCount] = useState("fawf");

    //Load librarystructure from JSONs
    useEffect(() => {
        fetch("./src/assets/picture-library.json")
            .then((resp) => {
                return resp.json()
            }).then((res) => {
                setLoading(res.albums)
                setAlbumCount(res.albums.length)
                let ic = 0
                res.albums.map((x) => {
                    ic = ic + x.pictures.length
                })
                
                setImageCount(ic)
            })
        }, [])

    const availableCategories = ["albums", "images", "favorites"]

    const category = props.category

    let categoryCheck = false

    availableCategories.map(x => {
        if(x === category) {
            categoryCheck = true
        }
    })

    if(categoryCheck === false) {
        console.debug("Invalid category input")
        return (<div/>)
    }

    const image = "./src/assets/" + props.image + ".png"
    let categoryImage = props.small ? styles.categoryImageSmall : styles.categoryImageLarge

    function Bottom() {
        return  (
            <div className={styles.ViewAll}>
                <p>View all {props.title}</p>
            </div>
        )
    }

    const ContentCount = (() => {
        if(category === "albums")
            return albumCount
        
        if(category === "images")
            return imageCount

        return ""
    })

    function Top() {
        return (
            <div className={styles.CategoryTitle}>             
                <img className={categoryImage} src={image}/>
                <p className={styles.Title}>{props.title}</p>
                <AddCategory show={props.show}showModal={props.showModal} noAdd={props.noAdd} category={props.title}/>
                <ContentAmount suffix={category} count={ContentCount()} className={styles.Count}/>
            </div>
        )
    }

    function Albums() {
        if(loading === undefined) {
            return "Loading";
        }
        return (
            <div className={styles.Albums}>
                {loading.map(x => 
                    <div className={styles.Album}>
                        <img className={styles.AlbumHeaderImage} src={"./src/assets/" + x.headerImage}/>
                        <p className={styles.AlbumTitle}>{x.title}</p>
                        <p className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
                    </div>)}
                {console.log(albumCount)}
            </div>
        )
    }

    function Images() {
        if(loading === undefined) {
            return "Loading";
        }
        return (
            <div className={styles.Images}>
                {
                    loading.map(x => 
                        x.pictures.map(y => 
                            <div className={styles.Image}>
                                <img className={styles.PictureImage} src={"./src/assets/" + x.path + "/"  + y.imgLoRes}/>
                            </div>  
                        )
                    )
                }
                {console.log(loading)}
            </div>
        )
    }

   /* class MyComponent extends React.Component {      
  
        render () {
           const imageClick = () => {
             console.log('Click');
           } 
           return (
              <div>
                 <img src={require('/myfolder/myimage.png')} onClick={() => imageClick()} />
              </div>
           );
        }
     }*/  //Skulle försöka så att man kan klicka på bilderna 

    let cat = (() => {
        if(category === "albums")  {
            return <Albums/>
        } else if(category === "images") {
            return <Images/>
        } else if(category === "favorites") {
            return <Images/>
        }
    })

    return (
        <div className={styles.CategoryContainer}>
            <Top/>
            {cat()}
            <Bottom/>
        </div>
    )
}

export default CategoryTitle