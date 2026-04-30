const StaticBackground = () => {
  const backgroundStyle = {
    background: `
      radial-gradient(120% 95% at 18% 20%, rgba(152, 181, 175, 0.92) 0%, rgba(152, 181, 175, 0.72) 22%, transparent 56%),
      radial-gradient(120% 100% at 84% 18%, rgba(66, 93, 100, 0.72) 0%, rgba(66, 93, 100, 0.42) 28%, transparent 60%),
      radial-gradient(110% 100% at 54% 84%, rgba(28, 55, 62, 0.82) 0%, rgba(28, 55, 62, 0.54) 24%, transparent 58%),
      linear-gradient(135deg, #98B5AF 0%, #72908d 34%, #425d64 68%, #1c373e 100%)
    `,
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" aria-hidden="true">
      <div className="absolute inset-0" style={backgroundStyle} />
    </div>
  );
};

export default StaticBackground;
