import React from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal__confirmation modal_open">
      <div className="modal__confirmation-content">
        <button
          onClick={onClose}
          className="modal__confirmation-close-btn"
          type="button"
        >
          {/* <img
            src="../assets/itemmodalclosebutton.svg"
            alt="Close"
            className="modal__confirmation-close-icon"
          /> */}
          x
        </button>
        <h2 className="modal__confirmation-title">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__confirmation-description">
          This action is irreversible.
        </p>
        <div className="modal__actions">
          <button onClick={onConfirm} className="modal__confirm-button">
            Yes, delete item
          </button>
          <button onClick={onClose} className="modal__cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
