import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <Image
          alt="nextui logo"
          height={200}
          radius="none"
          src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
          width={200}
        />{" "}
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      >
        <NavbarItem>
          <Link
            color="foreground"
            href="/"
            className="mx-4 text-lg navItem"
          >
            Add
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/wallets"
            className="mx-4 text-lg navItem"
          >
            Wallets
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* Spacer */}
      </NavbarContent>
    </Navbar>
  );
}
