import { Metadata } from "next";
import CastMinder from "~/components/Castminder";

const appUrl = process.env.NEXT_PUBLIC_URL;

// Stringified FrameEmbed JSON according to the spec
const frameMetadata = {
  version: "vNext",
  image: `${appUrl}/opengraph-image`,
  buttons: [
    { label: "5 minutes" },
    { label: "15 minutes" },
    { label: "30 minutes" },
  ],
  input: {
    text: "What would you like to be reminded about?",
  },
  postUrl: `${appUrl}/api/frame`,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "CastMinder",
    description: "Set reminders right from Farcaster",
    openGraph: {
      title: "CastMinder",
      description: "Set reminders right from Farcaster",
      images: [`${appUrl}/opengraph-image`],
    },
    other: {
      // This is the key meta tag that defines this as a Frame
      "fc:frame": JSON.stringify(frameMetadata),
      "fc:frame:image": `${appUrl}/opengraph-image`,
      "fc:frame:button:1": "5 minutes",
      "fc:frame:button:2": "15 minutes",
      "fc:frame:button:3": "30 minutes",
      "fc:frame:input:text": "What would you like to be reminded about?",
      "fc:frame:post_url": `${appUrl}/api/frame`,
    },
  };
}

export default function Home() {
  return <CastMinder />;
}
