import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker.tsx";

export default function DefaultInputs() {
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
    <ComponentCard title="Basic Car Details">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Car Name</Label>
          <Input type="text" id="input" />
        </div>
        <div>
          <Label htmlFor="inputTwo">Car Model</Label>
          <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
        </div>
        <div>
          <Label>Car Type </Label>
          <Select
          options={options}
          placeholder="Select an option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
          />
          </div>
          <div>
            <Label htmlFor="inputTwo">Variant</Label>
            <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
          </div>
           <div>
            <Label htmlFor="inputTwo">Registration Number</Label>
            <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
          </div>
            <div>
            <Label htmlFor="inputTwo">Year of Manufacture</Label>
            <Input type="number" id="inputTwo" placeholder="info@gmail.com" />
          </div>
           <div>
            <Label htmlFor="inputTwo">Color</Label>
            <Input type="number" id="inputTwo" placeholder="info@gmail.com" />
          </div>
           <div>
            <Label htmlFor="inputTwo">Color</Label>
            <Input type="number" id="inputTwo" placeholder="info@gmail.com" />
          </div>
           <div>
          <Label>Transmission </Label>
          <Select
          options={Transmission}
          placeholder="Select an option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
          />
          </div>
          <div>
            <Label htmlFor="inputTwo">Seating capacity</Label>
            <Input type="number" id="inputTwo" placeholder="info@gmail.com" />
          </div>
          <div>
            <Label htmlFor="inputTwo"> Fuel Type</Label>
           <Select
          options={FuelType}
          placeholder="Select an option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
          />
          </div>
      </div>
    </ComponentCard>
  );
}
