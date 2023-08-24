import { Card } from "primereact/card";

interface CustomCardProps {
  title: string;
  children: React.JSX.Element;
}

function CustomCard({ title, children }: CustomCardProps) {
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <Card title={title} className="sm:w-full md:w-10 mt-4">
        {children}
      </Card>
    </div>
  );
}
export default CustomCard;
