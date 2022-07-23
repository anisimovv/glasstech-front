import React, { ComponentType, Fragment, useContext } from "react";
import { Listbox, Portal, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { usePopper } from "react-popper";

type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;

export const ListboxContext = React.createContext<any>(undefined);

export const ListboxStyled = ({
  children,
  className,
  ...props
}: ExtractProps<typeof Listbox>) => {
  const [targetElement, setTargetElement] = React.useState(null);

  const customClassNames = "relative";

  return (
    <Listbox {...props}>
      <ListboxContext.Provider value={{ targetElement, setTargetElement }}>
        <div className={`${customClassNames} ${className}`}>
          {children as React.ReactNode}
        </div>
      </ListboxContext.Provider>
    </Listbox>
  );
};

const Button = ({
  children,
  ...props
}: ExtractProps<typeof Listbox.Button>) => {
  const { setTargetElement } = useContext(ListboxContext);
  return (
    <Listbox.Button
      ref={setTargetElement}
      className="relative w-full rounded-lg bg-white h-10 pl-4 pr-10 text-left border border-slate-300"
      {...props}
    >
      <span className="block truncate text-slate-700">
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
  const popperElRef = React.useRef(null);
  const { targetElement } = useContext(ListboxContext);
  const [popperElement, setPopperElement] = React.useState(null);

  const { styles, attributes } = usePopper(targetElement, popperElement, {
    placement: "bottom-start",
  });

  return (
    <Portal>
      <div
        ref={popperElRef}
        style={{ ...styles.popper, width: targetElement?.scrollWidth }}
        {...attributes.popper}
      >
        <Transition
          // show={open}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          beforeEnter={() => setPopperElement(popperElRef.current)}
          afterLeave={() => setPopperElement(null)}
        >
          <Listbox.Options
            className="mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            {...props}
          >
            {children as React.ReactNode}
          </Listbox.Options>
        </Transition>
      </div>
    </Portal>
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
          active ? "bg-cyan-50 text-cyan-700" : "text-slate-700"
        }`
      }
      {...props}
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "text-cyan-700" : "font-normal"
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
