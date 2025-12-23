import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker.tsx";

export default function PickupDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Hatchback" },
    { value: "template", label: "Sedan" },
    { value: "development", label: "SUV" },
    { value: "development", label: "Luxury" },
    { value: "development", label: "EV" },
    { value: "development", label: "Minivan" },
  ];
    const Transmission = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
    
  ];
    const FuelType = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
    { value: "cnc", label: "CNC" },

  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Address</Label>
          <Input type="text" id="input" />
        </div>
        <div>
          <Label htmlFor="inputTwo">State </Label>
          <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
        </div>
        
          <div>
            <Label htmlFor="inputTwo">City</Label>
            <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
          </div>
           <div>
            <Label htmlFor="inputTwo">Pincode</Label>
            <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
          </div>
            <div>
            <Label htmlFor="inputTwo">Latitude (optional)</Label>
            <Input type="number" id="inputTwo" placeholder="info@gmail.com" />
          </div>
           <div>
            <Label htmlFor="inputTwo">Longitude (optional)</Label>
            <Input type="number" id="inputTwo" placeholder="info@gmail.com" />
          </div>
      </div>
    </ComponentCard>
  );
}
