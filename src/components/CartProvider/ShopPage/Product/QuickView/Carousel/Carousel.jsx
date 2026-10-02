import styles from "./Carousel.module.css";
import { extractImgId } from "../../../../../../utils";
import { useState } from "react";

export function Carousel({ leadImgSrc, leadImgAlt, productName, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const leadId = extractImgId(leadImgSrc);

  const nextSlide = (e) => {
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
        <img src={leadImgSrc} alt={leadImgAlt} />
        {images
          ?.filter((image) => extractImgId(image.url) !== leadId)
          .map((image) => (
            <img
              key={extractImgId(image.url) ?? index}
              src={image.cleaned_url || image.url}
              alt={image.alt_text || productName || "Product image"}
            ></img>
          ))}
      </div>
      <button class={styles.carouselBtn} id="prevBtn" onClick={prevSlide}>
        &#10094;
      </button>
      <button class={styles.carouselBtn} id="nextBtn" onClick={nextSlide}>
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
