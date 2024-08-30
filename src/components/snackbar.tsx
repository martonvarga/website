import { Dispatch, SetStateAction } from "react";

type SnackBarProps = {
  text: string;
  setShowSnackBar: Dispatch<SetStateAction<boolean>>;
};

function SnackBar({ text, setShowSnackBar }: SnackBarProps) {
  function onClose() {
    setShowSnackBar(false);
  }

  return (
    <div className="snackbar">
      <svg fill="currentColor" viewBox="0 0 16 16" className="snackbar-icon">
        <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
        <path d="M10.97 4.97a.235.235 0 00-.02.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-1.071-1.05z" />
      </svg>

      <p>{text}</p>
      <button onClick={onClose}>
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          className="snackbar-icon snackbar-close-icons"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      </button>
    </div>
  );
}

export default SnackBar;
