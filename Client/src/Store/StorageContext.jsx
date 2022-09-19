import { useEffect } from "react";
import { createContext, useState } from "react";

const StorageContext = createContext({
  ImageStorage: null,
  albumStorage: null,
  SetImageStorage: null,
  SetAlbumStorage: null,
  SetToLocalStorage: null,
  UpdateLocalStorage: null,
  LogLocalStorage: null,
  SetSelectedFiles: null,
  SelectedFiles: null
});

export function StorageContextProvider(props) {
  const [imageStorage, setImageStorage] = useState()
  const [albumStorage, setAlbumStorage] = useState()
  const [selectedFiles, setSelectedFiles] = useState()

  useEffect(() => {
    setImageStorage({ key: "", images: JSON.stringify({ images: [{}] }) })
  }, [])

  function getImagesFromStorage(category) {
    let obj = null
    category === "images" ? obj = JSON.parse(localStorage.getItem("images")) : null
    category === "album" ? obj = JSON.parse(localStorage.getItem("album")) : null
    console.log(obj)
    return obj
  }

  //Function to populate Localstorage
  function setToLocalStorage(value, category) {
    const objectFromStorage = getImagesFromStorage(category)

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
          //const inTo = JSON.stringify(images)
          //setToLocalStorage(inTo, "images")
          //return
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

  //Push the objects in localstorage to a singleobjects that's supposed to be sent in a POST request
  function logLocalStorage() {
    let images = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))
      images.push(value)
    }
    const storageObjects = { ...images }
    console.log(storageObjects)
  }

  const context = {
    ImageStorage: imageStorage,
    albumStorage: albumStorage,
    SetImageStorage: setImageStorage,
    SetAlbumStorage: setAlbumStorage,
    SetToLocalStorage: setToLocalStorage,
    UpdateLocalStorage: updateLocalStorage,
    LogLocalStorage: logLocalStorage,
    SetSelectedFiles: setSelectedFiles,
    SelectedFiles: selectedFiles,
  }

  return <StorageContext.Provider value={context}>
    {props.children}
  </StorageContext.Provider>
}

export default StorageContext;