import NavHeader from "./components/NavHeader";
import WalletManager from "./components/Content";
import DataDisplayComponent from "./components/testComp/Display";
import ParentComponent from "./components/testComp/Input";

export default function Home() {
  return (
    <>
      <nav>
        <NavHeader />
      </nav>
      <main className="flex flex-col justify-center bg-p3-alt">
        {/* <WalletManager /> */}
        <ParentComponent />
      </main>
    </>
  );
}
