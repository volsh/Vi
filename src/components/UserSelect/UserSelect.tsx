import { selectorFamily } from "recoil";
import { ListFetchRequest } from "../../../@types/common";
import { User } from "../../../@types/user";
import { fetchUsers } from "../../api/usersApi";
import Autocomplete, {
  AutocompleteProps,
} from "../common/Autocomplete/Autocomplete";
import useAutocompleteWithFetch from "../../hooks/useAutocompleteWithFetch";

type UserSelectProps = {
  value?: User;
  onChange?: (value: unknown) => void;
  options?: User[];
} & Omit<AutocompleteProps, "value" | "onChange" | "options">;

const usersQuery = selectorFamily({
  key: "Users",
  get: (search?: string) => async () => {
    let params: ListFetchRequest = {
      size: 100,
    };
    if (search) {
      params.filters = {
        name: search,
      };
    }
    const response = await fetchUsers(params);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

export default function UserSelect(props: UserSelectProps) {
  const { value, onChange, options: initialOptions = [], ...rest } = props;

  const { handleChange, handleInputChange, options, loading } = useAutocompleteWithFetch(
    {
      selectorFamilyFunc: usersQuery as ReturnType<typeof selectorFamily>,
      onChange,
    }
  );

  return (
    <>
      <Autocomplete
        labelField="name"
        placeholder="Select user..."
        {...rest}
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
