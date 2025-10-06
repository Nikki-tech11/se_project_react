import "./ModalWithForm.css";
import closebutton from "../../assets/modalclosebutton.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  closeForm,
}) {
  return (
    <div className={`modal ${activeModal === "addGarment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeForm}
          className="modal__close-button"
          type="button"
        >
          <img src={closebutton} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
