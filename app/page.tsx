import NavHeader from "./components/NavHeader";
import Content from "./components/Content";

export default function Home() {
  

  return (
    <>
      <nav>
        <NavHeader />
      </nav>
      <main className="flex flex-col justify-center bg-p3-alt">
        <Content/>
      </main>
    </>
  );
}
