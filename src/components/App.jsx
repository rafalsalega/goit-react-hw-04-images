import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { key } from '../asset/pass';
import css from './App.module.css';

console.log(key)
export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=6755131-7999fe22e3bb9fa8947c67297&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setSelectedImage(null);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };

  }, [query, page]);

const handleSubmit = query => {
  setQuery(query);
  setPage(1);
  setImages([]);
};

const handleLoadMore = () => {
  setPage(prevPage => prevPage + 1);
};

  const handleImageSelection = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery
            images={images}
            id={nanoid}
            setSelectedImage={handleImageSelection}
          />
          <Button onClick={handleLoadMore} />
        </>
      )}
      {selectedImage && (
        <Modal imageUrl={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};