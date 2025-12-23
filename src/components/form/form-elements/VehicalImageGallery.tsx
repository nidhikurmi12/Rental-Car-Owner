import React, { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";

type ImageItem = {
  file?: File | null;
  previewUrl?: string | null;
};

const MAX_IMAGES = 4;

export default function VehicleImageGallery() {
  const [exteriorImages, setExteriorImages] = useState<ImageItem[]>(
    Array(MAX_IMAGES).fill({ file: null, previewUrl: null })
  );
  const [interiorImages, setInteriorImages] = useState<ImageItem[]>(
    Array(MAX_IMAGES).fill({ file: null, previewUrl: null })
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "exterior" | "interior",
    index: number
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);

    const updateFn = type === "exterior" ? setExteriorImages : setInteriorImages;
    const images = type === "exterior" ? [...exteriorImages] : [...interiorImages];

    images[index] = { file, previewUrl };
    updateFn(images);
  };

  const handleRemoveImage = (type: "exterior" | "interior", index: number) => {
    const updateFn = type === "exterior" ? setExteriorImages : setInteriorImages;
    const images = type === "exterior" ? [...exteriorImages] : [...interiorImages];

    images[index] = { file: null, previewUrl: null };
    updateFn(images);
  };

  const renderGallery = (images: ImageItem[], type: "exterior" | "interior") => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img, idx) => (
        <div key={idx} className="relative w-full h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          {img.previewUrl ? (
            <>
              <img
                src={img.previewUrl}
                alt={`${type} ${idx + 1}`}
                className="object-cover w-full h-full"
                onLoad={() => URL.revokeObjectURL(img.previewUrl!)}
              />
              <button
                onClick={() => handleRemoveImage(type, idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-400 hover:text-pink-500 transition-colors duration-200">
              <FiUpload className="w-6 h-6 mb-1" />
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, type, idx)}
              />
            </label>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Exterior Images</h3>
        {renderGallery(exteriorImages, "exterior")}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Interior Images</h3>
        {renderGallery(interiorImages, "interior")}
      </div>
    </div>
  );
}
