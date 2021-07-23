import { useRouter } from "next/router";

export default function ComunidadePage() {
  const router = useRouter();
  const { id } = router.query;
  return <>{id}</>;
}
