import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ imageUrl, closeModal }) => {
  const handleClose = event => {
    if (event.target.className === `${css.overlay}`) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img className="img" src={imageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};