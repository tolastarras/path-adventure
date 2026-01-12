import { useImageLoader } from '.';
import {
  treeImage,
  mudImage,
  waterImage,
  sandImage,
  grassImage,
  rockImage,
} from '@/assets';

const useTerrainImages = () => {
  const tree = useImageLoader(treeImage);
  const mud = useImageLoader(mudImage);
  const water = useImageLoader(waterImage);
  const sand = useImageLoader(sandImage);
  const grass = useImageLoader(grassImage);
  const rock = useImageLoader(rockImage);

  const terrainImages = {
    tree,
    mud, 
    water,
    sand,
    grass,
    rock,
  };

  const allImagesLoaded = Object.values(terrainImages).every(img => img.isLoaded);

  return {
    terrainImages,
    allImagesLoaded,
  };
};

export default useTerrainImages;
