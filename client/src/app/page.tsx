import { Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <h2>{process.env.GOOGLE_CLIENT_ID}</h2>
      <Button variant="contained">Contained</Button>
    </>
  );
}
