// VehicleConditionUpdate.tsx
import React, { useState, useRef } from 'react';
import { Upload, Camera, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface DamageArea {
  id: string;
  name: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  notes: string;
  photos: File[];
}

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  vin: string;
  mileage: string;
}

const VehicleConditionUpdate: React.FC = () => {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    make: '',
    model: '',
    year: '',
    vin: '',
    mileage: '',
  });

  const [damageAreas, setDamageAreas] = useState<DamageArea[]>([
    { id: '1', name: 'Front Bumper', condition: 'good', notes: '', photos: [] },
    { id: '2', name: 'Rear Bumper', condition: 'good', notes: '', photos: [] },
    { id: '3', name: 'Left Front Fender', condition: 'excellent', notes: '', photos: [] },
    { id: '4', name: 'Right Front Fender', condition: 'excellent', notes: '', photos: [] },
    { id: '5', name: 'Left Door', condition: 'fair', notes: '', photos: [] },
    { id: '6', name: 'Right Door', condition: 'good', notes: '', photos: [] },
    { id: '7', name: 'Windshield', condition: 'excellent', notes: '', photos: [] },
    { id: '8', name: 'Rear Windshield', condition: 'good', notes: '', photos: [] },
    { id: '9', name: 'Left Quarter Panel', condition: 'good', notes: '', photos: [] },
    { id: '10', name: 'Right Quarter Panel', condition: 'good', notes: '', photos: [] },
    { id: '11', name: 'Hood', condition: 'excellent', notes: '', photos: [] },
    { id: '12', name: 'Roof', condition: 'excellent', notes: '', photos: [] },
    { id: '13', name: 'Wheels', condition: 'fair', notes: '', photos: [] },
    { id: '14', name: 'Interior', condition: 'good', notes: '', photos: [] },
    { id: '15', name: 'Engine Bay', condition: 'good', notes: '', photos: [] },
  ]);

  const [selectedArea, setSelectedArea] = useState<DamageArea | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conditionColors = {
    excellent: 'bg-green-100 text-green-800 border-green-200',
    good: 'bg-blue-100 text-blue-800 border-blue-200',
    fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    poor: 'bg-orange-100 text-orange-800 border-orange-200',
    damaged: 'bg-red-100 text-red-800 border-red-200',
  };

  const handleVehicleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (id: string, condition: DamageArea['condition']) => {
    setDamageAreas(prev =>
      prev.map(area =>
        area.id === id ? { ...area, condition } : area
      )
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setDamageAreas(prev =>
      prev.map(area =>
        area.id === id ? { ...area, notes } : area
      )
    );
  };

  const handlePhotoUpload = (id: string, files: FileList) => {
    const fileArray = Array.from(files);
    setDamageAreas(prev =>
      prev.map(area =>
        area.id === id
          ? { ...area, photos: [...area.photos, ...fileArray] }
          : area
      )
    );
  };

  const removePhoto = (areaId: string, photoIndex: number) => {
    setDamageAreas(prev =>
      prev.map(area =>
        area.id === areaId
          ? { ...area, photos: area.photos.filter((_, index) => index !== photoIndex) }
          : area
      )
    );
  };

  const simulateUpload = () => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            alert('Vehicle condition report submitted successfully!');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateUpload();
  };

  const conditionOptions = [
    { value: 'excellent', label: 'Excellent', icon: '✅' },
    { value: 'good', label: 'Good', icon: '👍' },
    { value: 'fair', label: 'Fair', icon: '⚠️' },
    { value: 'poor', label: 'Poor', icon: '👎' },
    { value: 'damaged', label: 'Damaged', icon: '🚨' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Condition Update</h1>
          <p className="text-gray-600 mt-2">Upload and document vehicle condition with photos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vehicle Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <input
                  type="text"
                  name="make"
                  value={vehicleInfo.make}
                  onChange={handleVehicleInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={vehicleInfo.model}
                  onChange={handleVehicleInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Camry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={vehicleInfo.year}
                  onChange={handleVehicleInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VIN
                </label>
                <input
                  type="text"
                  name="vin"
                  value={vehicleInfo.vin}
                  onChange={handleVehicleInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Vehicle Identification Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage
                </label>
                <input
                  type="text"
                  name="mileage"
                  value={vehicleInfo.mileage}
                  onChange={handleVehicleInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 15,000"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Areas Grid */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Vehicle Areas Condition
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {damageAreas.map(area => (
                <div
                  key={area.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedArea?.id === area.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedArea(area)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900">{area.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${conditionColors[area.condition]}`}>
                      {area.condition.charAt(0).toUpperCase() + area.condition.slice(1)}
                    </span>
                  </div>

                  {/* Condition Selector */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {conditionOptions.map(option => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConditionChange(area.id, option.value as DamageArea['condition']);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          area.condition === option.value
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="mr-1">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {/* Notes Input */}
                  <textarea
                    placeholder="Add notes about this area..."
                    value={area.notes}
                    onChange={(e) => handleNotesChange(area.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && handlePhotoUpload(area.id, e.target.files)}
                      onClick={(e) => e.stopPropagation()}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      <span className="text-sm font-medium">Add Photos</span>
                    </button>

                    {/* Preview Photos */}
                    {area.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {area.photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removePhoto(area.id, index);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Area Details */}
          {selectedArea && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedArea.name} - Detailed View
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedArea(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Photos</h3>
                  {selectedArea.photos.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No photos uploaded for this area</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {selectedArea.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`${selectedArea.name} photo ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Notes</h3>
                  <textarea
                    value={selectedArea.notes}
                    onChange={(e) => handleNotesChange(selectedArea.id, e.target.value)}
                    className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add detailed notes about this area..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary and Submit */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
                <p className="text-gray-600 text-sm">
                  Total Areas: {damageAreas.length} | Photos: {damageAreas.reduce((acc, area) => acc + area.photos.length, 0)}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {isSubmitting && (
                  <div className="w-64">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Condition Report'}
                </button>
              </div>
            </div>
            
            {/* Condition Distribution */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {conditionOptions.map(option => {
                const count = damageAreas.filter(a => a.condition === option.value).length;
                return (
                  <div
                    key={option.value}
                    className={`p-3 rounded-lg border ${conditionColors[option.value as keyof typeof conditionColors]}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm opacity-75">areas</div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleConditionUpdate;