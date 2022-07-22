import React, { ComponentType, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;

export const ListboxStyled = ({
  children,
  className,
  ...props
}: ExtractProps<typeof Listbox>) => {
  const customClassNames = "relative";

  return (
    <Listbox {...props}>
      <div className={`${customClassNames} ${className}`}>
        {children as React.ReactNode}
      </div>
    </Listbox>
  );
};

const Button = ({
  children,
  ...props
}: ExtractProps<typeof Listbox.Button>) => {
  return (
    <Listbox.Button
      className="relative w-full rounded-lg bg-white h-10 pl-4 pr-10 text-left border border-slate-300"
      {...props}
    >
      <span className="block truncate text-slate-900">
        {children as React.ReactNode}
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <SelectorIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
};

const Options = ({
  children,
  ...props
}: ExtractProps<typeof Listbox.Options>) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options
        className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        {...props}
      >
        {children as React.ReactNode}
      </Listbox.Options>
    </Transition>
  );
};

const Option = ({
  children,
  ...props
}: ExtractProps<typeof Listbox.Option>) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
          active ? "bg-cyan-50 text-cyan-900" : "text-slate-900"
        }`
      }
      {...props}
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {children as React.ReactNode}
          </span>
          {selected ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

ListboxStyled.Button = Button;
ListboxStyled.Options = Options;
ListboxStyled.Option = Option;
