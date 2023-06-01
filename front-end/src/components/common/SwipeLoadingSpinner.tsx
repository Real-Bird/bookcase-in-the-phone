const SwipeLoadingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <path
          d="M50 30A20 20 0 1 0 67.82013048376736 40.920190005209065"
          fill="none"
          stroke="#6ab04c"
          strokeWidth="7"
        ></path>
        <path d="M49 18L49 42L61 30L49 18" fill="#6ab04c"></path>
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </g>
    </svg>
  );
};

export default SwipeLoadingSpinner;
