export default function ConfirmIcon({ className }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs id="Patterns_And_Gradients">
        <linearGradient id="Gradient1" gradientTransform="rotate(45 0.5 0.5)">
          <stop offset="0" stop-color="#F7D44C" stop-opacity="1" />
          <stop offset="0.5" stop-color="#c00000" stop-opacity="1" />
          <stop offset="1" stop-color="#7938E9" stop-opacity="1" />
        </linearGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="47"
        stroke-width="2.3"
        fill="none"
        stroke="url(#Gradient1)"
      />

      <path
        d="M 25 50 L 40 65 L 75 35"
        fill="none"
        stroke="url(#Gradient1)"
        stroke-width="2.3"
		strokeLinecap="round"
      />
    </svg>
  );
}
