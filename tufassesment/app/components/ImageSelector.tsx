'use client';

import { useState } from 'react';
import { Image as ImageIcon, X, Upload } from 'lucide-react';

interface ImageSelectorProps {
  selectedImage: string;
  onImageChange: (image: string) => void;
}

const PRESET_IMAGES = [
  { 
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B' /%3E%3Cstop offset='100%25' style='stop-color:%23EE5A24' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g1)'/%3E%3Ctext x='400' y='280' font-size='80' text-anchor='middle' fill='white' font-family='Arial'%3E🏔️%3C/text%3E%3Ctext x='400' y='360' font-size='32' text-anchor='middle' fill='white' font-family='Arial'%3EMountain Sunset%3C/text%3E%3C/svg%3E", 
    name: 'Mountain Sunset' 
  },
  { 
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2338ada9' /%3E%3Cstop offset='100%25' style='stop-color:%2322867e' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g2)'/%3E%3Ctext x='400' y='280' font-size='80' text-anchor='middle' fill='white' font-family='Arial'%3E🌲%3C/text%3E%3Ctext x='400' y='360' font-size='32' text-anchor='middle' fill='white' font-family='Arial'%3EEnchanted Forest%3C/text%3E%3C/svg%3E", 
    name: 'Enchanted Forest' 
  },
  { 
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FDCB6E' /%3E%3Cstop offset='100%25' style='stop-color:%23F39C12' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g3)'/%3E%3Ctext x='400' y='280' font-size='80' text-anchor='middle' fill='white' font-family='Arial'%3E🏖️%3C/text%3E%3Ctext x='400' y='360' font-size='32' text-anchor='middle' fill='white' font-family='Arial'%3ETropical Beach%3C/text%3E%3C/svg%3E", 
    name: 'Tropical Beach' 
  },
  { 
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23a29bfe' /%3E%3Cstop offset='100%25' style='stop-color:%236c5ce7' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g4)'/%3E%3Ctext x='400' y='280' font-size='80' text-anchor='middle' fill='white' font-family='Arial'%3E🌆%3C/text%3E%3Ctext x='400' y='360' font-size='32' text-anchor='middle' fill='white' font-family='Arial'%3ECity Lights%3C/text%3E%3C/svg%3E", 
    name: 'City Lights' 
  },
];

const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236B8EFF' /%3E%3Cstop offset='100%25' style='stop-color:%239B59FF' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23grad)'/%3E%3Ctext x='400' y='250' font-size='64' text-anchor='middle' fill='white' font-family='Arial'%3E📅%3C/text%3E%3Ctext x='400' y='320' font-size='36' text-anchor='middle' fill='white' font-family='Arial'%3EWall Calendar%3C/text%3E%3Ctext x='400' y='380' font-size='20' text-anchor='middle' fill='white' font-family='Arial'%3EClick 'Change Image' to customize%3C/text%3E%3C/svg%3E";

export default function ImageSelector({ selectedImage, onImageChange }: ImageSelectorProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(DEFAULT_IMAGE);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setCurrentImage(imageUrl);
        onImageChange(imageUrl);
        setShowGallery(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (url: string) => {
    setCurrentImage(url);
    onImageChange(url);
    setShowGallery(false);
  };

  return (
    <div className="image-selector w-full text-black">
      <div className="relative group cursor-pointer">
        <img
          src={currentImage}
          alt="Calendar hero"
          className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
        />
        <div 
          onClick={() => setShowGallery(true)}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Change Image
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowGallery(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Choose an Image</h3>
              <button
                onClick={() => setShowGallery(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">Upload Custom Image</label>
                <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  <span className="text-sm">Click to upload from your computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Preset Images</label>
                <div className="grid grid-cols-2 gap-4">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetSelect(img.url)}
                      className="group relative overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-500 transition-all"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                        <span className="text-white text-sm font-medium">{img.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}