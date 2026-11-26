import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="dark-surface grid-texture bg-midnight text-paper">
      <Container className="py-28 sm:py-36">
        <p className="font-display text-sm font-semibold tracking-[0.18em] text-teal uppercase">404</p>
        <h1 className="mt-4 max-w-3xl text-display font-bold">This page doesn’t exist — yet.</h1>
        <p className="mt-6 max-w-xl text-lg text-mist">The link may be out of date, or the page may have moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" tone="dark" arrow>
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/contact" tone="dark" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
