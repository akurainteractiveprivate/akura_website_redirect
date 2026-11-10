import RedirectView from "@/components/RedirectView";

interface CatchAllProps {
  params: Promise<{
    catchAll?: string[];
  }>;
}

export default async function CatchAllPage({ params }: CatchAllProps) {
  const resolvedParams = await params;
  const path = resolvedParams.catchAll
    ? `/${resolvedParams.catchAll.join("/")}`
    : "";

  return <RedirectView subpath={path} />;
}
