import NavHeader from "./components/NavHeader";
import AddWallet from "./components/AddWallet";
import Listings from "./components/Listings";

export default function Home() {
  return (
    <>
      <nav>
        <NavHeader />
      </nav>
      <main className="flex justify-center">
        <div className="m-auto  align-center py-32">
          <AddWallet />
          <Listings />
        </div>
      </main>
    </>
  );
}
