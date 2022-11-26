import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Meta from "./Meta";
import { useAccount } from "wagmi";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isConnected } = useAccount();
  return (
    <div>
      <Meta />
      <div className="w-full min-h-screen bg-[#111] text-white">
        <Header />
        <div className="flex w-full mx-auto max-w-8xl">{children}</div>
      </div>
    </div>
  );
}
