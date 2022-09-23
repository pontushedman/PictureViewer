import { createContext, useState, useEffect } from "react";

const StorageContext = createContext({
  ImageStorage: null,
  albumStorage: null,
  SetImageStorage: null,
  SetAlbumStorage: null,
  SetToLocalStorage: null,
  UpdateLocalStorage: null,
  LogLocalStorage: null,
  SetSelectedFiles: null,
  SelectedFiles: null,
  GetAlbum: null,
  SetAlbum: null,
  UpdateAlbum: null,
  GetImagesFromStorage: null,
  ClearLocalStorage: null
})

export function StorageContextProvider(props) {
  const [imageStorage, setImageStorage] = useState()
  const [albumStorage, setAlbumStorage] = useState()
  const [selectedFiles, setSelectedFiles] = useState()

  useEffect(() => {
    setImageStorage({ key: "", images: JSON.stringify({ images: [{}] }) })
  }, [])

  function setAlbum(album) {
      localStorage.setItem("album", JSON.stringify(album))
      setAlbumStorage(album)
  }

  function getAlbum() {
    const storageAlbum = JSON.parse(localStorage.getItem("album"))
    if (storageAlbum !== null) {
      return storageAlbum
    }
    return {album:"", title: "", comment: "", image: ""}
  }

  function updateAlbum(field, value) {
    let album = {...getAlbum()}
    field === "title" ? album.title = value : album.title
    field === "comment" ? album.comment = value : album.comment
    field === "image" ? album.image = value : album.image
    setAlbum(album)
  }

  function getImagesFromStorage() {
    let obj = null
    obj = JSON.parse(localStorage.getItem("images"))
    return obj
  }

  //Function to populate Localstorage
  function setToLocalStorage(value, category) {
    const objectFromStorage = getImagesFromStorage()

    const obj = JSON.stringify({ "images": [value] })

    if (objectFromStorage === null) {
      localStorage.setItem(category, obj)
      setImageStorage({ key: category, image: obj })
      console.log("Added item")

    } else {
      const newObj = JSON.stringify({ "images": [...objectFromStorage.images, value] })
      localStorage.setItem(category, newObj)
      setImageStorage({ key: category, images: newObj })
      console.log("Added new image to the array")
    }
  }

  function updateLocalStorage(inputKey, inputField, inputValue) {
    let imagesList = JSON.parse(localStorage.getItem("images"))

    let count = 0
    imagesList.images.map(image => {
      if (image.id == inputKey) {
        console.log(image.id + " ID is being edited")
        //Copy entries from retrieved object
        let storageItemKeys = [...Object.entries(image)]
        let newObj
        //Loop through entries
        //Set variable key to key of storageitemkey
        //Only set value to input value of the field that is equal to inputfield
        for (let index = 0; index < storageItemKeys.length; index++) {
          let key = storageItemKeys[index][0]
          if (key === inputField) {
            storageItemKeys[index][1] = inputValue
          }
          newObj = Object.fromEntries(storageItemKeys)
        }
        imagesList.images[count] = newObj
      }
      const editedObject = imagesList.images
      const newObj = JSON.stringify({ "images": editedObject })
      localStorage.setItem("images", newObj)
      count++
    }
    )

  }

  function clearLocalStorage(type) {
      localStorage.removeItem(type)
  }

  const context = {
    ImageStorage: imageStorage,
    albumStorage: albumStorage,
    SetImageStorage: setImageStorage,
    SetAlbumStorage: setAlbumStorage,
    SetToLocalStorage: setToLocalStorage,
    UpdateLocalStorage: updateLocalStorage,
    SetSelectedFiles: setSelectedFiles,
    SelectedFiles: selectedFiles,
    GetAlbum: getAlbum,
    SetAlbum: setAlbum,
    UpdateAlbum: updateAlbum,
    GetImagesFromStorage: getImagesFromStorage,
    ClearLocalStorage: clearLocalStorage
  }

  return <StorageContext.Provider value={context}>{props.children}</StorageContext.Provider>
}

export default StorageContext