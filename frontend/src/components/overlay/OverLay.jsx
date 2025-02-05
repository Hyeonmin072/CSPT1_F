//eslint-disable-next-line
export const Overlay = ({ isOpen, onClose }) =>
  isOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30"
      onClick={onClose}
      aria-hidden="true"
    />
  );
