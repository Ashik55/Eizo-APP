import { Locale } from "@/i18n.config";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Index({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  return <>Eizo APP</>;
}
