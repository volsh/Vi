import { debounce } from "lodash-es";
import { useState } from "react";
import { selectorFamily, useRecoilValueLoadable } from "recoil";

type useAutocompleteWithFetchProps = {
  selectorFamilyFunc: ReturnType<typeof selectorFamily>;
  onChange?: (value: unknown) => void;
};

export default function useAutocompleteWithFetch({
  selectorFamilyFunc,
  onChange,
}: useAutocompleteWithFetchProps) {
  const [search, setSearch] = useState<string>();

  const handleInputChange = debounce(
    (event: React.SyntheticEvent, value: string, reason: string) => {
      if (reason === "input" && value.length >= 2) {
        setSearch(value);
      }
    },
    500
  );
  const handleChange = (event: React.SyntheticEvent, value: unknown) => {
    onChange && onChange(value);
  };
  const usersLoadable = useRecoilValueLoadable(selectorFamilyFunc(search));

  return {
    handleChange,
    handleInputChange,
    options:
      usersLoadable.state === "hasValue"
        ? (usersLoadable.contents as readonly unknown[])
        : [],
    loading: usersLoadable.state === "loading",
  };
}
