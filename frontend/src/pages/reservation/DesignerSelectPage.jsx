import DesignerSelect from "../../components/reservation/designerselect/DesignerSelect.jsx";
import Header from "../../components/common/Header.jsx";
export default function DesignerSelectPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="p-4">
        <DesignerSelect />
      </div>
    </div>
  );
}
