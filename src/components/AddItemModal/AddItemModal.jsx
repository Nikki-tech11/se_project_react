import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../hooks/useForm";

const AddItemModal = ({ isOpen, closeForm, onAddItem }) => {
  const devaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange } = useForm(devaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      name="addGarment"
      title="New Garment"
      buttonText={"Add Garment"}
      closeForm={closeForm}
      isOpen={isOpen}
      onAddItem={onAddItem}
      onSubmit={handleSubmit}
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
          value={values.name}
          onChange={handleChange}
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
          value={values.imageUrl}
          onChange={handleChange}
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
            value="Hot"
            onChange={handleChange}
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
            value="Warm"
            onChange={handleChange}
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
            value="Cold"
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
