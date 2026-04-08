'use client';

import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageSelectorProps {
  selectedImage: string;
  onImageChange: (image: string) => void;
}

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', name: 'Mountain Landscape' },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop', name: 'Forest Path' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop', name: 'Beach Sunset' },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop', name: 'Forest River' },
];

export default function ImageSelector({ selectedImage, onImageChange }: ImageSelectorProps) {
  const [showGallery, setShowGallery] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-selector">
      <div className="relative group">
        <img
          src={selectedImage}
          alt="Calendar hero"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
          <button
            onClick={() => setShowGallery(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Change Image
          </button>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Choose an Image</h3>
              <button
                onClick={() => setShowGallery(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Upload Custom Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Preset Images</label>
                <div className="grid grid-cols-2 gap-4">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onImageChange(img.url);
                        setShowGallery(false);
                      }}
                      className="group relative"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-32 object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          Select
                        </div>
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