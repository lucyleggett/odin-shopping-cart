import styles from "./Carousel.module.css";
import { extractImgId } from "../../../../../utils";
import { useState } from "react";

export function Carousel({ leadImgSrc, leadImgAlt, productName, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const leadId = extractImgId(leadImgSrc);

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
        &#10094;
      </button>
      <button className={styles.carouselBtn} id="nextBtn" onClick={nextSlide}>
        &#10095;
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
