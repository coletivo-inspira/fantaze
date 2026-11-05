import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Loader2, Minus, Plus, Sparkles, Users } from 'lucide-react';
import { restaurant } from '../../data/restaurant';
import { getThemeForDate } from '../../data/themes';
import { cn } from '../../lib/cn';
import { formatLongDate, maskPhone } from '../../lib/format';
import { reservationService } from '../../services/reservationService';
import type { Reservation, TimeSlot } from '../../types';
import Button from '../ui/Button';
import ReservationSuccess from './ReservationSuccess';
import { buildDays, experiences } from './reservationOptions';

const steps = ['Quando', 'Seus dados', 'Confirmar'];

interface FormState {
  date: string;
  time: string;
  people: number;
  experience: Reservation['experience'];
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const initialState: FormState = {
  date: '',
  time: '',
  people: 2,
  experience: 'salao',
  name: '',
  phone: '',
  email: '',
  notes: '',
};

export default function ReservationFlow() {
  const days = useMemo(() => buildDays(), []);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState<Reservation | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  // Busca a disponibilidade sempre que data ou número de pessoas mudar
  useEffect(() => {
    if (!form.date) return;
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingSlots(true);
    reservationService.getAvailability(form.date, form.people).then((data) => {
      if (!alive) return;
      setSlots(data);
      setLoadingSlots(false);
      setForm((f) => (data.some((s) => s.time === f.time && s.available) ? f : { ...f, time: '' }));
    });
    return () => {
      alive = false;
    };
  }, [form.date, form.people]);

  const theme = form.date ? getThemeForDate(form.date) : undefined;

  const errors = {
    name: form.name.trim().length < 3 ? 'Informe o nome completo' : '',
    phone: form.phone.replace(/\D/g, '').length < 10 ? 'Informe um telefone com DDD' : '',
    email: form.email && !/^\S+@\S+\.\S+$/.test(form.email) ? 'E-mail inválido' : '',
  };
  const stepOneValid = Boolean(form.date && form.time);
  const stepTwoValid = !errors.name && !errors.phone && !errors.email;

  function next() {
    if (step === 0 && stepOneValid) setStep(1);
    if (step === 1) {
      setTouched(true);
      if (stepTwoValid) setStep(2);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const reservation = await reservationService.create({
      date: form.date,
      time: form.time,
      people: form.people,
      themeId: theme?.id ?? 'a-definir',
      experience: form.experience,
      name: form.name.trim(),
      phone: form.phone,
      email: form.email.trim(),
      notes: form.notes.trim(),
    });
    setSubmitting(false);
    setDone(reservation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setForm(initialState);
    setSlots([]);
    setStep(0);
    setTouched(false);
    setDone(null);
  }

  if (done) return <ReservationSuccess reservation={done} onReset={reset} />;

  return (
    <form
      onSubmit={submit}
      className="overflow-hidden rounded-[2.5rem] border border-brand-indigo/10 bg-white shadow-[0_40px_80px_-50px_rgba(48,19,126,0.6)]"
    >
      {/* Etapas */}
      <ol className="grid grid-cols-3 border-b border-brand-indigo/10 bg-brand-peach/50">
        {steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              'flex items-center justify-center gap-1.5 px-1.5 py-3.5 text-[11px] font-extrabold uppercase tracking-wide transition-colors sm:gap-2 sm:px-2 sm:py-4 sm:text-sm sm:tracking-wider',
              i === step ? 'text-brand-indigo' : i < step ? 'text-brand-purple' : 'text-brand-ink/35',
            )}
          >
            <span
              className={cn(
                'grid h-7 w-7 place-items-center rounded-full text-xs',
                i === step ? 'bg-brand-indigo text-white' : i < step ? 'bg-brand-purple text-white' : 'bg-brand-indigo/10',
              )}
            >
              {i + 1}
            </span>
            <span className={i === step ? 'inline' : 'hidden sm:inline'}>{label}</span>
          </li>
        ))}
      </ol>

      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-9">
                <section>
                  <h3 className="flex items-center gap-2 text-2xl text-brand-indigo">
                    <CalendarDays size={22} className="text-brand-pink" /> Escolha o dia
                  </h3>
                  <div className="no-scrollbar -mx-2 mt-4 flex gap-3 overflow-x-auto px-2 pb-3">
                    {days.map((d) => {
                      const t = getThemeForDate(d.iso);
                      const active = form.date === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          disabled={!d.open}
                          onClick={() => set('date', d.iso)}
                          aria-pressed={active}
                          className={cn(
                            'flex w-[4.6rem] shrink-0 flex-col items-center rounded-2xl border px-2 py-3 transition-all',
                            active
                              ? 'border-brand-indigo bg-brand-indigo text-white shadow-lg'
                              : 'border-brand-indigo/15 bg-white hover:-translate-y-0.5 hover:border-brand-purple',
                            !d.open && 'cursor-not-allowed opacity-35 hover:translate-y-0 hover:border-brand-indigo/15',
                          )}
                        >
                          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">{d.weekday}</span>
                          <span className="font-display text-3xl leading-none">{d.day}</span>
                          <span className="text-[11px] font-bold uppercase opacity-70">{d.month}</span>
                          <span
                            className={cn('mt-2 h-1.5 w-1.5 rounded-full', t ? 'bg-brand-amber' : 'bg-brand-pink/60')}
                            title={t ? t.name : 'Tema a definir'}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1 text-xs text-brand-ink/55">
                    Fechado às segundas. O ponto abaixo do dia indica se já há tema definido.
                  </p>
                </section>

                <section className="grid gap-9 md:grid-cols-2">
                  <div>
                    <h3 className="flex items-center gap-2 text-2xl text-brand-indigo">
                      <Users size={22} className="text-brand-pink" /> Quantas pessoas?
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-5 rounded-full border border-brand-indigo/15 p-2">
                      <button
                        type="button"
                        aria-label="Diminuir"
                        onClick={() => set('people', Math.max(1, form.people - 1))}
                        className="grid h-11 w-11 place-items-center rounded-full bg-brand-peach text-brand-indigo transition-colors hover:bg-brand-cream"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-14 text-center font-display text-4xl text-brand-indigo">{form.people}</span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() => set('people', Math.min(restaurant.maxPeoplePerReservation, form.people + 1))}
                        className="grid h-11 w-11 place-items-center rounded-full bg-brand-indigo text-white transition-colors hover:bg-brand-purple"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-brand-ink/55">
                      Grupos acima de {restaurant.maxPeoplePerReservation} pessoas? Fale com a gente pelo WhatsApp.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-2xl text-brand-indigo">
                      <Sparkles size={22} className="text-brand-pink" /> Experiência
                    </h3>
                    <div className="mt-4 space-y-2">
                      {experiences.map((exp) => (
                        <label
                          key={exp.id}
                          className={cn(
                            'flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-all',
                            form.experience === exp.id
                              ? 'border-brand-purple bg-brand-peach/60'
                              : 'border-brand-indigo/15 hover:border-brand-purple/50',
                          )}
                        >
                          <input
                            type="radio"
                            name="experience"
                            checked={form.experience === exp.id}
                            onChange={() => set('experience', exp.id)}
                            className="mt-1 accent-brand-purple"
                          />
                          <span>
                            <span className="block font-bold text-brand-indigo">{exp.title}</span>
                            <span className="block text-sm text-brand-ink/65">{exp.description}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-2xl text-brand-indigo">
                    <Clock size={22} className="text-brand-pink" /> Horário
                  </h3>
                  {!form.date ? (
                    <p className="mt-4 rounded-2xl bg-brand-peach/50 p-5 text-sm text-brand-ink/65">
                      Escolha um dia para ver os horários disponíveis.
                    </p>
                  ) : loadingSlots ? (
                    <p className="mt-4 flex items-center gap-2 text-sm text-brand-ink/65">
                      <Loader2 size={16} className="animate-spin" /> Consultando disponibilidade…
                    </p>
                  ) : (
                    <>
                      <p className="mt-2 text-sm capitalize text-brand-ink/65">{formatLongDate(form.date)}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                        {slots.map((s) => (
                          <button
                            key={s.time}
                            type="button"
                            disabled={!s.available}
                            onClick={() => set('time', s.time)}
                            aria-pressed={form.time === s.time}
                            className={cn(
                              'rounded-2xl border px-3 py-3 text-center transition-all',
                              form.time === s.time
                                ? 'border-brand-indigo bg-brand-indigo text-white shadow-lg'
                                : 'border-brand-indigo/15 hover:-translate-y-0.5 hover:border-brand-purple',
                              !s.available && 'cursor-not-allowed opacity-40 line-through hover:translate-y-0',
                            )}
                          >
                            <span className="block font-bold">{s.time}</span>
                            <span className="block text-[11px] opacity-70">
                              {!s.available ? 'Lotado' : s.seatsLeft <= 8 ? 'Últimos lugares' : 'Disponível'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-3xl text-brand-indigo">Quem vai receber a confirmação?</h3>
                <Field label="Nome completo" error={touched ? errors.name : ''}>
                  <input
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    autoComplete="name"
                    placeholder="Como devemos te chamar?"
                    className={inputClass(Boolean(touched && errors.name))}
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="WhatsApp / telefone" error={touched ? errors.phone : ''}>
                    <input
                      value={form.phone}
                      onChange={(e) => set('phone', maskPhone(e.target.value))}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(31) 99999-0000"
                      className={inputClass(Boolean(touched && errors.phone))}
                    />
                  </Field>
                  <Field label="E-mail (opcional)" error={touched ? errors.email : ''}>
                    <input
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      type="email"
                      autoComplete="email"
                      placeholder="voce@email.com"
                      className={inputClass(Boolean(touched && errors.email))}
                    />
                  </Field>
                </div>
                <Field label="Observações (opcional)">
                  <textarea
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    rows={3}
                    maxLength={300}
                    placeholder="Aniversário, restrição alimentar, cadeirinha para criança…"
                    className={inputClass(false)}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-3xl text-brand-indigo">Confira sua reserva</h3>
                <dl className="mt-6 grid gap-x-8 gap-y-5 rounded-3xl bg-brand-peach/50 p-6 sm:grid-cols-2">
                  <Row label="Data" value={formatLongDate(form.date)} capitalize />
                  <Row label="Horário" value={form.time} />
                  <Row label="Pessoas" value={String(form.people)} />
                  <Row label="Experiência" value={experiences.find((e) => e.id === form.experience)?.title ?? ''} />
                  <Row label="Tema" value={theme ? `${theme.name} — ${theme.badge}` : 'A definir pela votação'} />
                  <Row label="Responsável" value={form.name} />
                  <Row label="Contato" value={form.phone + (form.email ? ` · ${form.email}` : '')} />
                  {form.notes && <Row label="Observações" value={form.notes} />}
                </dl>
                <p className="mt-5 text-sm text-brand-ink/60">
                  Ao confirmar, você envia uma solicitação. Nossa equipe retorna por WhatsApp para confirmar a mesa.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-brand-indigo transition-colors hover:bg-brand-peach"
            >
              <ArrowLeft size={16} /> Voltar
            </button>
          ) : (
            <span />
          )}

          {step < 2 ? (
            <Button
              type="button"
              onClick={next}
              disabled={step === 0 && !stepOneValid}
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              Continuar
            </Button>
          ) : (
            <Button type="submit" variant="secondary" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Enviando…
                </>
              ) : (
                'Confirmar solicitação'
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

const inputClass = (error: boolean) =>
  cn(
    'w-full rounded-2xl border bg-white px-4 py-3.5 text-brand-ink placeholder:text-brand-ink/35 transition-colors focus:outline-none focus:ring-2',
    error
      ? 'border-brand-pink focus:ring-brand-pink/30'
      : 'border-brand-indigo/15 focus:border-brand-purple focus:ring-brand-purple/20',
  );

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-brand-indigo">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm font-semibold text-brand-pink">{error}</span>}
    </label>
  );
}

function Row({ label, value, capitalize }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand-purple">{label}</dt>
      <dd className={cn('mt-1 font-bold text-brand-indigo', capitalize && 'capitalize')}>{value}</dd>
    </div>
  );
}
