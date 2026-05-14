import s from './TempCard.module.css';

type TempCardProps = {
  title: string | undefined;
  temp: string | undefined;
};

const TempCard = ({ title, temp }: TempCardProps) => {
  return (
    <div className={s.tempCard}>
      <p className={s.tempCard__title}>{title}</p>
      <p className={s.tempCard__temp}>{temp}</p>
    </div>
  );
};

export default TempCard;
