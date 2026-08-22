import { SkipLink } from "@/components/a11y/skip-link";
import { OnlevMarketing } from "@/features/onlev/marketing/onlev-marketing";
import {
  OnlevOpening,
  ShowroomHero,
  ShowroomCoda,
} from "@/features/showroom/hero/showroom-hero";

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <OnlevOpening />
        <OnlevMarketing />
        <ShowroomHero />
        <ShowroomCoda />
      </main>
    </>
  );
}
