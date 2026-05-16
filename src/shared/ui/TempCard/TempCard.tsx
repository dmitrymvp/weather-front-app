import './TempCard.css';

type TempCardProps = {
  title: string | undefined;
  temp: string | undefined;
};

const TempCard = ({ title, temp }: TempCardProps) => {
  return (
    <div className="temp-card">
      <p className="temp-card__title">{title}</p>
      <p className="temp-card__value">{temp}</p>
    </div>
  );
};

export default TempCard;
