import { useState } from "react";

import img1 from "./assets/gallery/image 1.png";
import img2 from "./assets/gallery/image 2.png";
import img3 from "./assets/gallery/image 3.png";
import img4 from "./assets/gallery/image 4.png";
import img5 from "./assets/gallery/image 5.png";
import img6 from "./assets/gallery/image 6.png";
import img7 from "./assets/gallery/image 7.png";
import img8 from "./assets/gallery/image 8.png";
import img9 from "./assets/gallery/image 9.png";
import img10 from "./assets/gallery/image 10.png";

import activeHome from "./assets/active-home.svg";
import closeModal from "./assets/close-modal.svg";
import closedMenu from "./assets/closed-menu.svg";
import inactiveLike from "./assets/inactive-like.svg";
import inactiveSettings from "./assets/inactive-settings.svg";
import like from "./assets/like.svg";
import next from "./assets/next.svg";
import openMenu from "./assets/open-menu.svg";
import prev from "./assets/prev.svg";

function Card(props) {
  return (
    <div className="card">
      <img
        src={props.photo}
        onClick={props.modalOpen}
        onDoubleClick={() => props.botaoLikeFunction(props.photo)}
        className="photo"
        alt=""
      ></img>
      <img
        src={props.like === false ? inactiveLike : like}
        onClick={() => props.botaoLikeFunction(props.photo)}
        className="like"
        alt=""
      ></img>
      <div className="photoInfo">
        <span className="photoInfo__desc">Lorem Ipsum</span>
        <span className="photoInfo__date">Há um mês</span>
      </div>
    </div>
  );
}

function Menu(props) {
  return (
    <div className="menu">
      <div className="menu__up">
        <img
          className="menuClose menu__item"
          src={!props.menuOpen ? closedMenu : openMenu}
          onClick={props.botaoMenuOpen}
          alt=""
        ></img>

        <div className="menu__item">
          <img className="menu__item-img" src={activeHome} alt=""></img>
          <span
            className="menu__item-span"
            style={{ margin: props.menuOpen ? "0px 30px" : "0px" }}
          >
            {props.menuOpen === false ? "" : "Home"}
          </span>
        </div>

        <div className="menu__item">
          <img className="menu__item-img" src={inactiveLike} alt=""></img>
          <span
            className="menu__item-span greyColor"
            style={{ margin: props.menuOpen ? "0px 30px" : "0px" }}
          >
            {props.menuOpen === false ? "" : "Favorites"}
          </span>
        </div>
      </div>

      <div className="menu__item-settings">
        <img className="menu__item-img" src={inactiveSettings} alt=""></img>
        <span 
          className="menu__item-span  greyColor" 
          style={{margin: props.menuOpen ? "0px 30px" : "0px"}}>
          {props.menuOpen === false ? "" : "Settings"}
        </span>
      </div>
    </div>
  );
}

function Modal(props) {
  return (
    <div
      style={{ display: !props.modal ? "none" : "flex" }}
      className="imageView"
    >
      <img
        className="imageView__close"
        onClick={props.modalClose}
        src={closeModal}
        alt=""
      ></img>
      <img
        className="imageView__prev"
        src={prev}
        onClick={props.prevImg}
        alt=""
      ></img>
      <img className="imageView__img" src={props.imgModal} alt=""></img>
      <img
        className="imageView__next"
        src={next}
        onClick={props.nextImg}
        alt=""
      ></img>
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([
    { photo: img1, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img2, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img3, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img4, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img5, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img6, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img7, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img8, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img9, botaoLikeFunction: botaoLikeFunction, like: false },
    { photo: img10, botaoLikeFunction: botaoLikeFunction, like: false },
  ]);

  const [menuOpen, setMenuOpen] = useState(false);

  function botaoMenuOpen() {
    menuOpen === false ? setMenuOpen(true) : setMenuOpen(false);
  }

  const [modal, setModal] = useState(false);
  const [imgModal, setimgModal] = useState();
  function modalClose() {
    setModal(!modal);
  }

  function modalOpen(event) {
    setimgModal(event.target.attributes[0].nodeValue);
    setModal(!modal);
  }

  function nextImg() {
    const index = cards.findIndex((card) => card.photo === imgModal);
    console.log(index);
    index !== cards.length - 1
      ? setimgModal(cards[index + 1].photo)
      : setimgModal(cards[0].photo);
  }

  function prevImg() {
    const index = cards.findIndex((card) => card.photo === imgModal);
    index !== 0
      ? setimgModal(cards[index - 1].photo)
      : setimgModal(cards[cards.length - 1].photo);
  }

  function botaoLikeFunction(idPhoto) {
    const cardToChange = cards.find((card) => idPhoto === card.photo);
    cardToChange.like === false
      ? (cardToChange.like = true)
      : (cardToChange.like = false);
    setCards([...cards]);
  }
  return (
    <div className="App">
      <Menu menuOpen={menuOpen} botaoMenuOpen={botaoMenuOpen}></Menu>
      <Modal
        modal={modal}
        modalClose={modalClose}
        imgModal={imgModal}
        nextImg={nextImg}
        prevImg={prevImg}
      ></Modal>
      <h1 className="tittle">Inicio</h1>
      <div className="divPhotos">
        {cards.map((card) => {
          return (
            <Card
              modalOpen={modalOpen}
              photo={card.photo}
              botaoLikeFunction={card.botaoLikeFunction}
              like={card.like}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
