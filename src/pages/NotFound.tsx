import Button from '../components/ui/Button';
import Decor from '../components/ui/Decor';

export default function NotFound() {
  return (
    <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-gradient-to-b from-brand-peach to-brand-paper px-6 pt-20 text-center">
      <Decor name="clapper" float className="left-[12%] top-[30%] w-24 sm:w-32" />
      <Decor name="sparkles" twinkle className="right-[14%] top-[26%] w-14" />
      <div>
        <p className="font-display text-8xl text-brand-purple sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl text-brand-indigo sm:text-4xl">Esse mundo ainda não existe.</h1>
        <p className="mx-auto mt-3 max-w-md text-brand-ink/70">
          A página que você procura saiu voando. Que tal voltar para um universo que já está aberto?
        </p>
        <Button to="/" size="lg" className="mt-8">
          Voltar ao início
        </Button>
      </div>
    </section>
  );
}
