import './ParametrCard.css';

type ParametrCardProps = {
  title: string | undefined;
  value: string | undefined;
};

const ParametrCard = ({ title, value }: ParametrCardProps) => {
  return (
    <div className="param-card">
      <p className="param-card__title">{title}</p>
      <p className="param-card__value">{value}</p>
    </div>
  );
};

export default ParametrCard;
