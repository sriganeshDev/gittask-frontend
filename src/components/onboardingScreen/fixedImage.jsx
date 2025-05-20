const FixedImage = () => {
  return (
    <div className="relative w-full md:w-1/2 lg:w-2/2 h-4/4 md:h-full  overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/top-view-unrecognizable-hacker-performing-cyberattack-night_1098-18706.jpg?t=st=1747032684~exp=1747036284~hmac=6e06e011483dc5af9c0713685bcc9003fc6b80d4d295f6d319ba4ae0e078ae2a&w=740)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
      <svg
        className="lg:hidden md:hidden absolute -bottom-0.5 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#f4f4f5"
          d="M0,160 C690,-190 1080,480 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
};

export default FixedImage;
