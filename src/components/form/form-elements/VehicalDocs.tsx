import React, { useState } from "react";
import { FiUpload, FiFileText, FiImage } from "react-icons/fi";

type DocumentItem = {
  id: string;
  name: string;
  file?: File | null;
  previewUrl?: string | null;
};

const initialDocuments: DocumentItem[] = [
  { id: "registration", name: "Registration Certificate" },
  { id: "pollution", name: "Pollution Certificate" },
  { id: "insurance", name: "Insurance Document" },
  { id: "fitness", name: "Fitness Certificate" },
];

export default function VehicleDocumentsUpload() {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);

  const handleFileChange = (id: string, fileList: FileList | null) => {
    if (!fileList) return;
    const file = fileList[0];
    if (!file) return;

    const newDocs = documents.map((doc) => {
      if (doc.id === id) {
        let previewUrl: string | null = null;
        if (file.type.startsWith("image/")) {
          previewUrl = URL.createObjectURL(file);
        }
        return { ...doc, file, previewUrl };
      }
      return doc;
    });
    setDocuments(newDocs);
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">
        Vehicle Documents Upload
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm bg-white">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-black tracking-wide">
                Document Name
              </th>
              <th className="text-left px-6 py-4 font-semibold text-black tracking-wide">
                Upload
              </th>
              <th className="text-left px-6 py-4 font-semibold text-black tracking-wide">
                Preview
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {documents.map(({ id, name, file, previewUrl }) => (
              <tr
                key={id}
                className="hover:bg-pink-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">{name}</td>

                <td className="px-6 py-4">
                  <label
                    htmlFor={`upload-${id}`}
                    className="
                      flex cursor-pointer items-center gap-2
                      px-4 py-2
                      border border-gray-300 rounded-md
                      bg-white
                      text-gray-600 font-semibold
                      hover:bg-gray-100
                      transition-colors duration-200
                      shadow-sm
                      select-none
                      w-max
                    "
                  >
                    <FiUpload className="w-5 h-5" />
                    Choose File
                  </label>
                  <input
                    id={`upload-${id}`}
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(id, e.target.files)}
                    className="hidden"
                  />
                  {file && (
                    <p className="mt-1 text-sm text-gray-600 truncate max-w-xs" title={file.name}>
                      {file.name}
                    </p>
                  )}
                </td>

                <td className="px-6 py-4">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={`${name} preview`}
                      className="max-w-[140px] max-h-[100px] rounded-lg shadow-md border border-gray-200 object-contain"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
                    />
                  ) : file ? (
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FiFileText className="w-5 h-5" />
                      {file.name}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm flex items-center gap-1">
                      <FiImage className="w-4 h-4" />
                      No file selected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}