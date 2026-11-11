export function City() {
  return (
    <div className="city" aria-hidden="true">
      <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMax slice">
        <rect width="1440" height="720" fill="#1b2b35" />
        <circle cx="1090" cy="150" r="65" fill="#334b55" />
        <path
          d="M0 380H90V270H180V330H240V220H310V360H390V180H480V310H550V250H640V350H720V200H790V280H900V170H970V330H1040V240H1140V320H1250V210H1330V340H1440V720H0Z"
          fill="#223640"
        />
        <path
          d="M0 470H80V365H230V445H320V290H450V440H570V340H680V450H770V300H900V430H1000V350H1130V420H1240V280H1370V470H1440V720H0Z"
          fill="#15252e"
        />
        {Array.from({ length: 65 }, (_, i) => (
          <rect
            key={i}
            x={35 + ((i * 97) % 1360)}
            y={320 + ((i * 43) % 210)}
            width={i % 3 ? 8 : 18}
            height="12"
            fill={i % 7 === 0 ? "#b5a17c" : "#506d76"}
            opacity={i % 4 === 0 ? 0.7 : 0.3}
          />
        ))}
        <path d="M0 590H1440V720H0Z" fill="#111d25" />
        <path d="M1040 720L960 590H1080L1330 720Z" fill="#29424a" />
        <path d="M0 665H1440M0 688H1440" stroke="#29424a" strokeWidth="2" />
        <path
          d="M1138 600V330Q1138 300 1175 300H1208"
          fill="none"
          stroke="#718a8b"
          strokeWidth="5"
        />
        <path d="M1190 302H1225" stroke="#d6d5ce" strokeWidth="5" />
        <path
          d="M20 580H220V560H20Z M40 580V650 M200 580V650"
          stroke="#425860"
          strokeWidth="7"
        />
      </svg>
      <div className="rain">
        {Array.from({ length: 28 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${i * 3.7}%`,
              animationDelay: `-${i * 0.31}s`,
              animationDuration: `${1.1 + (i % 4) * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
