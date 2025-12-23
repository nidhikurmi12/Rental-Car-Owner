import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";

export default function InputGroup() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Input Group">
      <div className="space-y-6">
        <div>
          <Label>Pricing (₹)</Label>
          <div className="flex gap-3">
            <Input
              placeholder="info@gmail.com"
              type="number"
            />
           <Input
              placeholder="info@gmail.com"
              type="number"
            />
            <Input
              placeholder="info@gmail.com"
              type="number"
            />
            <Input
              placeholder="info@gmail.com"
              type="number"
            />
          </div>
        </div>
        <div>
          <Label>Security Deposit (₹)</Label>
          <Input
              placeholder="info@gmail.com"
              type="number"
            />
        </div>{" "}
       
      </div>
    </ComponentCard>
  );
}
