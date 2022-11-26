import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Meta from "./Meta";
import { useAccount } from "wagmi";
import Header from "./Header";
import styled from "styled-components";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isConnected } = useAccount();
  return (
    <Wrap>
      <Meta />
      <div className="w-full min-h-screen bg-[#111] text-white">
        <Header />
        <div className="flex w-full mx-auto max-w-7xl">{children}</div>
      </div>
    </Wrap>
  );
}
const Wrap = styled.div`
  background-image: url("/static/assets/backgound.svg");
`;
