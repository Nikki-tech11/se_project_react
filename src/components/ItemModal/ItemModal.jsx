import "./ItemModal.css";

function ItemModal({ activeModal, card, closeForm }) {
  if (!card) {
    return null; // Don't render the modal if card is undefined
  }

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeForm}
          className="modal__close-button"
          type="button"
        ></button>
        <img src={card.link} alt="Close" className="modal__close-icon" />
        <img
          src={card?.link || "default-image.jpg"}
          alt={card?.name || "Default Alt Text"}
          className="modal__close-icon"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
