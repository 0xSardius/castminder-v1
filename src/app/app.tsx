"use client";

import dynamic from "next/dynamic";

const Demo = dynamic(() => import("~/components/Castminder"), {
  ssr: false,
});

export default function App(
  { title }: { title?: string } = { title: "Frames v2 Demo" }
) {
  return <Demo title={title} />;
}
