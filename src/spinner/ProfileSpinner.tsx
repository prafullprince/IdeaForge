const ProfileSpinner = () => {
  return (
    <div className="relative min-h-40 flex justify-center items-center">
      <div className="loaderm absolute w-8 aspect-square rounded-full bg-[linear-gradient(0deg,rgb(255,230,6)_30%,#ffef0b_0_70%,rgb(255,225,0)_0)_50%/8%_100%,linear-gradient(90deg,rgb(107,255,2)_30%,#ee1212f9_0_70%,rgb(255,1,137)_0)_50%/100%_8%] bg-no-repeat left-1/2 top-[20%] animate-l23">
        <div className="before absolute inset-0 rounded-full bg-inherit opacity-[0.915] rotate-[30deg]"></div>
        <div className="after absolute inset-0 rounded-full bg-inherit opacity-[0.83] rotate-[60deg]"></div>
      </div>
    </div>
  );
};

export default ProfileSpinner;
