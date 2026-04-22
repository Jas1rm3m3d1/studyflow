import { TextField } from "@mui/material";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size="small"
    />
  );
}

export default SearchBar;