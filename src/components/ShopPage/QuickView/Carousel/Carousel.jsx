import styles from "./Carousel.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        <img
          src={images[currentIndex].cleaned_url || images[currentIndex].url}
          alt={images[currentIndex].alt_text}
        />
      </div>
      <button className={styles.carouselBtn} id="prevBtn" onClick={prevSlide}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button className={styles.carouselBtn} id="nextBtn" onClick={nextSlide}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      <div className={styles.dotsContainer}>
        {images.map((img, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
