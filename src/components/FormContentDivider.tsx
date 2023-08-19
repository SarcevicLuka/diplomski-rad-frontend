import { Divider } from "primereact/divider";

interface FormContentDivider {
  text: string;
  icon: React.JSX.Element;
}

function FormContentDivider({ icon, text }: FormContentDivider) {
  return (
    <Divider align="left">
      <div className="inline-flex align-items-center">
        {icon}
        <b>{text}</b>
      </div>
    </Divider>
  );
}

export default FormContentDivider;
