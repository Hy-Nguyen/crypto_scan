import NavHeader from "./components/NavHeader";
import AddWallet from "./components/AddWallet";
import Listings from "./components/Listings";

export default function Home() {
  return (
    <>
      <nav>
        <NavHeader />
      </nav>
      <main className="flex flex-col justify-center bg-p3-alt">
        <div className="m-auto align-center py-32">
          <AddWallet />

        </div>
        <div className="m-auto align-center py-32">
          <Listings />
        </div>
      </main>
    </>
  );
}
