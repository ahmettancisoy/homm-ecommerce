import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import { useState } from "react";

export default function ComboList({
  inputId,
  title,
  data,
  selected,
  setSelected,
}) {
  const [query, setQuery] = useState("");
  // const [selected, setSelected] = useState(data[0]);

  const normalizeString = (str) => {
    const map = {
      İ: "i",
      ı: "i",
      Ş: "s",
      ş: "s",
      Ğ: "g",
      ğ: "g",
      Ü: "u",
      ü: "u",
      Ö: "o",
      ö: "o",
      Ç: "c",
      ç: "c",
    };
    return str
      .split("")
      .map((char) => map[char] || char.toLowerCase())
      .join("");
  };

  const filteredData =
    query === ""
      ? data
      : data.filter((d) => {
          return normalizeString(d.name).includes(normalizeString(query));
        });

  return (
    <div>
      <label htmlFor={inputId} className="text-xs font-medium">
        {title}
      </label>
      <Combobox value={selected} onChange={(value) => setSelected(value)}>
        <div className="relative w-full">
          <ComboboxInput
            className="rounded-lg outline-none py-1.5 pr-8 pl-3 text-sm/6 border focus:border-cyan-600 z-20 w-full"
            displayValue={(d) => d?.name}
            onChange={(event) => setQuery(event.target.value)}
            id={inputId}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <HiChevronDown className="size-4 hover:fill-cyan-600" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            anchor="bottom"
            className="h-56 w-[var(--input-width)] rounded-xl border p-1 [--anchor-gap:var(--spacing-1)] empty:hidden bg-white z-20 scrollbar"
          >
            {filteredData.map((d) => (
              <ComboboxOption
                key={d.id}
                value={d}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-cyan-600 data-[focus]:text-white"
              >
                <HiCheck className="invisible size-4 fill-cyan-600 group-data-[selected]:visible group-data-[focus]:fill-white" />
                <div className="text-sm/6">{d.name}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
}
