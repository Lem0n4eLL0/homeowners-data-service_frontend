import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import commonStyle from '@styles/common.module.scss';
import style from './AppSelect.module.scss';
import arrow from '@assets/list_polygon_icon.svg';

export type OptionType<T extends { id: string } = { id: string }> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type AppSelectProps<T extends { id: string } = { id: string }> = {
  options: readonly OptionType<T>[];
  value?: OptionType<T> | null;
  onChange: (value: OptionType<T> | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  className?: string;
};

export function AppSelect<T extends { id: string } = { id: string }>({
  options,
  value,
  onChange,
  placeholder = 'Выберите значение',
  disabled = false,
  isError = false,
  className,
}: AppSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (option: OptionType<T>) => {
    if (option.disabled) return;
    onChange(option);
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className={clsx(style['select'], className)}>
      <button
        type="button"
        className={clsx(
          commonStyle['form_field'],
          style['select__trigger'],
          isOpen && style['select__trigger_open'],
          isError && commonStyle['form_field__error']
        )}
        onClick={() => !disabled && setIsOpen(v => !v)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={clsx(style['select__value'], !value && style['select__value_none'])}>
          {value?.label || placeholder}
        </span>
        <span className={clsx(style['select__arrow'], isOpen && style['select__arrow_open'])}>
          <img src={arrow} alt="" />
        </span>
      </button>

      {isOpen && (
        <ul className={clsx(style['select__dropdown'])} role="listbox">
          {options.map(option => (
            <li
              key={option.value.id}
              className={clsx(
                style['select__option'],
                value?.value.id === option.value.id && style['select__option_selected'],
                option.disabled && style['select__option_disabled']
              )}
              role="option"
              aria-selected={value?.value.id === option.value.id}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
          {options.length === 0 && <li className={style['select__empty']}>Нет вариантов</li>}
        </ul>
      )}
    </div>
  );
}
