import { useParams } from "react-router-dom";
import urls from "./config/urls";
import { useFetch } from "./hooks/useFetch";

type PlayerParams = {
  playerName: string;
};

const Player = () => {
  const { playerName } = useParams<PlayerParams>();

  const { data } = useFetch(`${urls.player}/${playerName}`);

  return (
    <div className="flex items-center rounded-xl bg-white shadow-md px-8 py-6">
      <img
        src={data?.avatar}
        alt={data.name}
        className="size-40 rounded-full bg-gray-50"
      />
      <div className="ml-5">
        <h2 className="text-xl font-bold">{data?.name || data.username}</h2>
        <p className="text-sm text-gray-500">{data?.title}</p>
        {data?.followers && (
          <p className="text-sm text-gray-500">
            followers: <span className="font-bold">{data?.followers}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Player;
