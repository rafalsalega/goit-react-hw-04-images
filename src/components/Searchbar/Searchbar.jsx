import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchBar}>
      <form
        className={css.searchForm}
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.elements.search.value);
        }}
      >
        <button type="submit" className={css.searchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {  
  onSubmit: PropTypes.func.isRequired, 
};