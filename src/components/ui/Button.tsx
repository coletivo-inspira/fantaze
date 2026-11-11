import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'theme';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-indigo text-white hover:bg-brand-purple shadow-[0_10px_30px_-10px_rgba(142,26,31,0.7)]',
  secondary: 'bg-brand-pink text-white hover:brightness-105 shadow-[0_10px_30px_-10px_rgba(252,120,147,0.8)]',
  ghost: 'border border-brand-indigo/20 text-brand-indigo hover:bg-brand-indigo/5',
  light: 'bg-white text-brand-indigo hover:bg-brand-sand',
  theme: 'bg-[var(--t-ink)] text-[var(--t-bg)] hover:opacity-90',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-sm sm:px-6',
  lg: 'px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type LinkProps = BaseProps & { to: string };
type AnchorProps = BaseProps & { href: string; external?: boolean };
type NativeProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export type ButtonProps = LinkProps | AnchorProps | NativeProps;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, icon } = props;
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide transition-all duration-300',
    'hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple',
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if ('to' in props) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }
  if ('href' in props) {
    return (
      <a
        href={props.href}
        className={classes}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, icon: _i, ...rest } = props;
  void _v; void _s; void _c; void _ch; void _i;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
