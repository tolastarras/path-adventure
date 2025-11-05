import { useImageLoader } from '.';
import {
  treeImage,
  mudImage,
  waterImage,
  sandImage,
  grassImage,
  rockImage,
} from '@/assets/landscape';

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

  const isAnyImageLoading = Object.values(terrainImages).some(img => !img.isLoaded);

  return {
    terrainImages,
    isAnyImageLoading,
  };
};

export default useTerrainImages;
