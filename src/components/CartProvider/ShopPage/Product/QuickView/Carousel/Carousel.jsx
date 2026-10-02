import styles from "./Carousel.module.css";
import { extractImgId } from "../../../../../../utils";

export function Carousel({ leadImgSrc, leadImgAlt, productName, images }) {
  const leadId = extractImgId(leadImgSrc);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        <img src={leadImgSrc} alt={leadImgAlt} />
        {images
            ?.filter(
              (image) =>
                extractImgId(image.url) !== leadId,
            )
            .map((image) => (
              <img
                key={extractImgId(image.url) ?? index}
                src={image.cleaned_url || image.url}
                alt={image.alt_text || productName || "Product image"}
              ></img>
            ))}
      </div>
    </div>
  );
}
