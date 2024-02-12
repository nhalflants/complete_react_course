/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-sm rounded-lg bg-yellow-400 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed";
  const styles = {
    small: base + " px-3 py-2 text-xs",
    round: base + " px-2.5 py-1 text-sm",
    primary: base + " px-4 py-3",
    secondary:
      "inline-block text-sm rounded-lg bg-stone-200 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-stone-300 disabled:cursor-not-allowed px-4 py-3",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
