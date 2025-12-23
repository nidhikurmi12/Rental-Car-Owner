import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import InputGroup from "../../components/form/form-elements/InputGroup";
import PickupDetails from "../../components/form/form-elements/PickupDetails";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import VehicleDocumentsUpload from "../../components/form/form-elements/VehicalDocs";
import Tabs from "../tab/tab";
import VehicleImageGallery from "../../components/form/form-elements/VehicalImageGallery";
 // your Tabs component

export default function FormElements() {
  const tabs = [
    {
      id: "basicForms",
      label: "Basic Form Elements",
      content: (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <DefaultInputs />
           
          </div>
          <div className="space-y-6">
            {/* You can add more if needed or keep this empty */}
             <InputGroup />
            <PickupDetails />
              <CheckboxComponents />
          </div>
        </div>
      ),
    },
    {
      id: "advancedControls",
      label: "Advanced Controls",
      content: (
        <div className="grid grid-cols-1 gap-6">
            <VehicleDocumentsUpload />
        </div>
      ),
    },
     {
      id: "ImageGallery",
      label: "Image Gallery",
      content: (
        <div className="grid grid-cols-1 gap-6">
            <VehicleImageGallery />
        </div>
      ),
    },
  ];


  return (
    <div className="p-6">
      <Tabs tabs={tabs} />
      {/* You can keep your next/previous buttons here if needed */}
    </div>
  );
}
