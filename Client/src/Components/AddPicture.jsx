import style from "./Styles/AddPicture.module.css";
import React from "react";

function AddPicture() {
  //const {register, handleSubmit} = useForm()

  return (
    <div className={style.container}>
      <h1 className={style.title}>Add Picture</h1>
      <div className={style.imgContainer}></div>
      <div>
        <div className={style.formcontainer}>
        <form>
          <input
            className={style.chooseFile}
            type="file"
            name="picture"
          > </input>
          <button className={style.choosebtn}>Submit</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default AddPicture;
