import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "../../hooks/useForm";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Routes } from "react-router-dom";
import { getItems } from "../../utils/api";
import { addItem } from "../../utils/api";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { deleteItem } from "../../utils/api";

function App() {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]); // Add the new item to the list
      })
      .catch(console.error);
  };

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [CurrentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openConfirmationModal = (item) => {
    console.log("Item to delete:", item);
    setItemToDelete(item);
    setIsConfirmationModalOpen(true);
    setActiveModal("");
  };

  const closeConfirmationModal = () => {
    console.log("Closing confirmation modal");
    setIsConfirmationModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteItem = () => {
    console.log("Item to delete:", itemToDelete);
    if (!itemToDelete) return;

    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        setIsConfirmationModalOpen(false); // Close the confirmation modal
        setItemToDelete(null); // Clear the item to delete
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const cardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const addClothesButtonClick = () => {
    setActiveModal("addGarment");
  };

  const closeModal = () => {
    console.log("Closing modal");
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    CurrentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        //this is the returned res.json response you would recieve from the weatherApi component, we call it data
        const processedWeatherData = processWeatherData(data);
        setWeatherData(processedWeatherData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ CurrentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            addClothesButtonClick={addClothesButtonClick}
            weatherData={weatherData}
            toggleswitch={<ToggleSwitch />}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  cardClick={cardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile clothingItems={clothingItems} cardClick={cardClick} />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          isOpen={activeModal === "addGarment"}
          activeModal={activeModal}
          closeForm={closeModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeForm={() => setActiveModal("")}
          openConfirmationModal={() => openConfirmationModal(selectedCard)}
        />
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleDeleteItem}
        />
        <Footer Footer={Footer} />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
