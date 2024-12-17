import { selectorFamily } from "recoil";
import { ListFetchRequest } from "../../../@types/common";
import Autocomplete, {
  AutocompleteProps,
} from "../common/Autocomplete/Autocomplete";
import useAutocompleteWithFetch from "../../hooks/useAutocompleteWithFetch";
import { Tag } from "../../../@types/tag";
import { fetchTags } from "../../api/tagsApi";

type UserSelectProps = {
  value?: Tag[];
  onChange?: (value: unknown) => void;
  options?: Tag[];
} & Omit<AutocompleteProps, "value" | "onChange" | "options">;

const tagsQuery = selectorFamily({
  key: "Tags",
  get: (search?: string) => async () => {
    let params: ListFetchRequest = {
      size: 100,
    };
    if (search) {
      params.filters = {
        name: search,
      };
    }
    const response = await fetchTags(params);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

export default function Tags(props: UserSelectProps) {
  const { value, onChange, options: initialOptions = [], ...rest } = props;

  const { handleChange, handleInputChange, options, loading } = useAutocompleteWithFetch(
    {
      selectorFamilyFunc: tagsQuery as ReturnType<typeof selectorFamily>,
      onChange,
    }
  );

  return (
    <>
      <Autocomplete
        labelField="name"
        placeholder="Select user..."
        {...rest}
        multiple
        options={options}
        loading={loading}
        value={value}
        onInputChange={handleInputChange}
        onChange={handleChange}
        filterOptions={(x) => x} // override default options filtering behaviour because we're fetching new options as we type
      />
    </>
  );
}
