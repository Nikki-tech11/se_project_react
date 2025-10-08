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
        <img
          src={card?.link || "default-image.jpg"}
          alt={card?.name || "Default Alt Text"}
          className="modal__picture"
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

// modal__close-button: Styles the close button itself (e.g., size, position).
// modal__close-icon: Styles the image/icon inside the close button.
// modal__picture: Styles the main image displayed in the modal.
