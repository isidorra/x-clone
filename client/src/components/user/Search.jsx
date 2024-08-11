import { useState, useEffect } from "react";
import useSearch from "../../hooks/user/useSearch";
import UserLink from "./UserLink";
import searchIcon from "../../assets/search.svg";

const Search = () => {
  const { loading, search } = useSearch();
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input.trim() === "") {
      setUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const result = await search(input);
      setUsers(result);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [input, search]);

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="flex items-center gap-2 mt-5">
        <img src={searchIcon} alt="Search" />
        <input
          value={input}
          onChange={(ev) => setInput(ev.target.value)}
          placeholder="Search people..."
          className="outline-none p-2 bg-primary w-full"
        />
      </div>

      {loading && <p>...</p>}
      {!loading && users.length === 0 && input && <p>No user found</p>}
      {!loading && users.length > 0 && (
        <div>
          {users.map((user) => (
            <div className="my-3" key={user._id}>
              <UserLink user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
