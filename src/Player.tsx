import { useLocation, useParams } from "react-router-dom";
import urls from "./config/urls";
import { useFetch } from "./hooks/useFetch";
import { useEffect, useRef, useState } from "react";

type PlayerParams = {
  playerName: string;
};

const Player = () => {
  const { playerName } = useParams<PlayerParams>();
  const intervalRef = useRef<any>();

  const [time, setTime] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime: number) => prevTime + 1);
    }, 1000);

    return () => {
      setTime(0);
      clearInterval(intervalRef.current);
    };
  }, [location]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const { data } = useFetch(`${urls.player}/${playerName}`);

  return (
    <>
      <div className="md:flex items-center rounded-xl bg-white shadow-md px-8 py-6">
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
      <div className="text-right mt-2">
        <h2>Time spent in the page</h2>
        <p>{formatTime(time)}</p>
      </div>
    </>
  );
};

export default Player;
