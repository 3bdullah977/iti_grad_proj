import Welcome from "./components/welcomeSection";
import Trending from "./components/trending";
import Popular from "./components/popular";
import "../../../style/app.scss";

export default function Home() {
  return (
    <main className="px-24">
      <Welcome />
      <Trending />
      <Popular />
    </main>
  );
}
