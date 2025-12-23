import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Checkbox from "../input/Checkbox";

export default function CheckboxComponents() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(true);
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);
  const data =[
    "AC",
    "Bluetooth",
    "GPS",
    "Sunroof",
    "Leather Seats",
    "Backup Camera",
    "USB Port",
    "Keyless Entry"
  ]
  return (
    <ComponentCard title="Features">
      <div className="flex flex-wrap items-center gap-4">
       {
        data.map((item)=>(
          <div key={item}>
            <Checkbox
            checked={isChecked}
            onChange={setIsChecked}
            label={item}
          />
          </div>
        ))
       }
        
    
       
      </div>
    </ComponentCard>
  );
}
