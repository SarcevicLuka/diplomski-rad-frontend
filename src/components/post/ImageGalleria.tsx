import { Galleria } from "primereact/galleria";
import { WatchImage } from "./types";

interface GalleriaProps {
  images: WatchImage[];
}

function ImageGalleria({ images }: GalleriaProps) {
  const itemTemplate = (item: WatchImage) => {
    return (
      <img
        src={item.data}
        alt={item.id}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <div className="mt-4 text-xlisLikedByUser font-medium flex flex-column justify-content-center">
      <div className="mb-1 text-xl">Image galleria: </div>
      <Galleria
        value={images}
        numVisible={5}
        circular
        style={{ maxWidth: "500px" }}
        showItemNavigators
        showIndicators
        showThumbnails={false}
        item={itemTemplate}
      />
    </div>
  );
}

export default ImageGalleria;
