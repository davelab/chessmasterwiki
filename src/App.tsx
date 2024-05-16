import { Link, Outlet } from "react-router-dom";
import urls from "./config/urls";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { data } = useFetch(urls.gms);

  console.log(data);

  return (
    <div className="max-h-dvh">
      <header className="px-6 h-[60px] flex items-center border-b border-b-gray-300">
        <h1 className="text-2xl font-bold">♞ Chess Masters Wiki</h1>
      </header>
      <div className="grid grid-cols-4">
        <aside className="min-w-80 h-[calc(100vh-60px)] overflow-hidden overflow-y-auto py-6">
          <ul>
            {data?.players?.map((player: string) => (
              <li className="px-4 py-2" key={player}>
                <Link to={`/player/${player}`}>{player}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-3">
          <div className="py-6 px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
