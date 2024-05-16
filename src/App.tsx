import { NavLink, Outlet } from "react-router-dom";
import urls from "./config/urls";
import { useFetch } from "./hooks/useFetch";
import classNames from "classnames";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

function App() {
  const { data, loading, setData } = useFetch(urls.gms);
  const [filterText, setFilterText] = useState("");
  const [isDesc, setIsDesc] = useState(false);

  const handleSort = useCallback(
    (desc = false) => {
      if (data?.players) {
        const sortedData = [...data.players].sort((a, b) => {
          if (desc) return b.localeCompare(a);

          return a.localeCompare(b);
        });
        setData({ players: sortedData });
      }
    },
    [data.players, setData]
  );

  useEffect(() => {
    handleSort(isDesc);
  }, [handleSort, isDesc]);

  console.log(data);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredData =
    !loading && data?.players
      ? data?.players.filter((item: string) =>
          item.toLowerCase().includes(filterText.toLowerCase())
        )
      : [];

  return (
    <div className="max-h-dvh">
      <header className="px-6 h-[60px] flex items-center border-b border-b-gray-300">
        <h1 className="text-2xl font-bold">♞ Chess Masters Wiki</h1>
      </header>

      <div className="grid grid-cols-[380px_auto]">
        <aside className="min-w-80 h-[calc(100vh-60px)] overflow-hidden overflow-y-auto p-6 aria-[current=page]:text-blue-400">
          <div className="flex">
            <div className="grow-1">
              {" "}
              <input
                className="w-full mb-5 p-3 border-2 border-black rounded-md"
                type="text"
                placeholder="Type to filter..."
                value={filterText}
                onChange={handleFilterChange}
              />
            </div>
            <button type="button" onClick={() => setIsDesc(!isDesc)}>
              Sort
            </button>
          </div>

          <ul>
            {filteredData.map((player: string) => (
              <li key={player}>
                <NavLink
                  className={({ isActive }) =>
                    classNames(
                      `block px-4 py-2 hover:bg-gray-100 rounded-md font-semibold`,
                      { "bg-blue-300": isActive }
                    )
                  }
                  to={`/player/${player}`}
                >
                  {player}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <div className="bg-gray-100">
          <div className="py-6 px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
