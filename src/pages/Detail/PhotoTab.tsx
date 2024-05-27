import { useLocation } from "react-router-dom";
import { PlaceReview } from "../../types/place";
import { useEffect, useState } from "react";
import { downloadFile } from "../../api/firebase/storage";

const PhotoTab = () => {
  const location = useLocation();
  const { title }: PlaceReview = location.state;
  const [images, setImages] = useState<string[]>();

  useEffect(() => {
    downloadFile(title).then((data) => setImages(data));
  }, [title]);

  return (
    <div>
      {images?.map((url) => (
        <img src={url} style={{ width: "100%", height: 300 }}></img>
      ))}
    </div>
  );
};

export default PhotoTab;
