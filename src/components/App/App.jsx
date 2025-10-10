import { useState, useEffect } from "react";
import { defaultClothingItems } from "../../utils/constants";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [clothingItems, setClothingItems] = useState(
    defaultClothingItems || []
  ); // Initialize state

  // Function to add a new clothing item
  const addClothingItem = (newItem) => {
    setClothingItems((prevItems) => [...prevItems, newItem]); // Add the new item to the list
  };

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const cardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const addClothesButtonClick = () => {
    setActiveModal("addGarment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        //this is the returned res.json response you would recieve from the weatherApi component, we call it data
        const processedWeatherData = processWeatherData(data);
        setWeatherData(processedWeatherData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          addClothesButtonClick={addClothesButtonClick}
          weatherData={weatherData}
        />
        <Main
          weatherData={weatherData}
          cardClick={cardClick}
          clothingItems={clothingItems}
        />
      </div>
      <ModalWithForm
        isOpen={activeModal === "addGarment"}
        name="addGarment"
        buttonText="Add Garment"
        title="New Garment"
        activeModal={activeModal}
        closeForm={closeModal}
      >
        <div className="modal__group">
          <label htmlFor="name" className="modal__label">
            Name{" "}
          </label>
          <input
            required
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </div>

        <div className="modal__group">
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
          </label>
          <input
            type="url"
            id="imageUrl"
            className="modal__input"
            placeholder="Image URL"
          />
        </div>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label className="modal__label modal__label_type_radio">
            <input
              required
              type="radio"
              id="hot"
              className="modal__radio-input"
              name="weather"
              value="hot"
            />
            <span>Hot</span>
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              required
              type="radio"
              id="warm"
              className="modal__radio-input"
              name="weather"
              value="warm"
            />
            <span>Warm</span>
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              required
              type="radio"
              id="cold"
              className="modal__radio-input"
              name="weather"
              value="cold"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeForm={closeModal}
      />
      <Footer Footer={Footer} />
    </div>
  );
}

export default App;
