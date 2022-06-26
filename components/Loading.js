import { SpinnerRoundFilled } from "spinners-react";
export const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <SpinnerRoundFilled size={56} thickness={128} speed={121} color="#36ad47" />
    </center>
  );
};
