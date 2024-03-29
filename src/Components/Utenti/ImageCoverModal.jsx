import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";

const ImageCoverModal = ({ setCoverSettingFunction, getPostsFunction }) => {
  const url = "http://localhost:3010";
  const token = sessionStorage.getItem("token");
  const tipo = sessionStorage.getItem("tipo");

  let route = "";

  const [image, setImage] = useState(null);
  function refreshPage() {
    window.location.reload(false);
  }

  const fd = new FormData();
  const changeImage = async () => {
    if (tipo === "pagina") {
      route = "pagine";
      console.log(image);
      fd.append("CoverImage", image);
      console.log(fd.get("file"));
    } else {
      route = "utenti";
      console.log(image);
      fd.append("UtenteCover", image);
      console.log(fd.get("file"));
    }
    try {
      let response = await fetch(url + "/" + route + "/me/cover/upload", {
        method: "PUT",

        headers: {
          Authorization: "bearer " + token,
        },
        body: fd,
      });
      if (response.ok) {
        alert("immagine caricata");
        // setImageSettingFunction();
        getPostsFunction();
        setImage(false);
        refreshPage();
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("errore nel caricamento dell'immagine" + error);
      console.log(error);
    }
  };

  return (
    <div className="shadow border border-2 border-primary  bg-third p-5 position-relative">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!image) {
            alert("nessun file selezionato!");
          } else {
            changeImage();
          }
        }}
      >
        <div className="d-flex align-items-start mb-4">
          <Form.Control
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <Button
            className="d-flex align-items-start position-absolute top-0 end-0   border-0 bg-none text-primary fs-4"
            onClick={() => {
              setCoverSettingFunction();
            }}
          >
            <TiDeleteOutline />
          </Button>
        </div>
        <Button type="submit" className="bg-primary rounded-4">
          cambia immagine
        </Button>
      </Form>
    </div>
  );
};

export default ImageCoverModal;
