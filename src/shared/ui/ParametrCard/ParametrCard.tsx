import s from './ParametrCard.module.css';

type ParametrCardProps = {
  title: string | undefined;
  value: string | undefined;
};

const ParametrCard = ({ title, value }: ParametrCardProps) => {
  return (
    <div className={s.parametrCard}>
      <p className={s.parametrCard__title}>{title}</p>
      <p className={s.parametrCard__temp}>{value}</p>
    </div>
  );
};

export default ParametrCard;
