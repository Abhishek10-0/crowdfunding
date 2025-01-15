import "./ConfirmDialog.css";

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3>Confirm Action</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="dialog-button confirm" onClick={onConfirm}>
            Sure
          </button>
          <button className="dialog-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
