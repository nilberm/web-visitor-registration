import { useState } from "react";
import style from "./style.module.scss";
interface SwitchProps {
  onToggle?: (isChecked: boolean) => void;
}
export default function Switch({ onToggle }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onToggle && onToggle(newValue);
  };

  return (
    <label className={style.switch}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={`${style.slider} ${style.round}`}></span>
    </label>
  );
}
