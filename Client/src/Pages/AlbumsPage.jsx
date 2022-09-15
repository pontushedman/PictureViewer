import {ImgContexProvider} from '../store/img'
import ImgContext from '../store/img'
import { useContext,} from 'react'
import styles from './Styles/AlbumsPage.module.css'

function AlbumsPage() {

    const imgCtx = useContext(ImgContext)
    return (
        (
            <div className={styles.AlbumsPage}>
                <div className={styles.top}>
                    <img className={styles.titleImage} src="./src/assets/albums.png"/>
                    <p className={styles.title}>All Albums</p>
                </div>
                <div className={styles.Albums}>
                    {imgCtx.AlbumsList.map(x =>
                        <div className={styles.Album}>
                            {console.log(x.headerImage)}
                            <img className={styles.AlbumHeaderImage} src={"http://localhost:3000/" + x.headerImage} />
                            <p className={styles.AlbumTitle}>{x.title}</p>
                            <p className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
                        </div>)}
                    {console.log(imgCtx.totalImages)}
                </div>
            </div>
        )
    )
}

export default AlbumsPage