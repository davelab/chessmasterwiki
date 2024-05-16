import { useRef, useEffect, useState } from "react";

export function useFetch(url: string) {
  const cacheRef = useRef<{ [key: string]: any }>({});
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (typeof url !== "string") return;

    let ignore = false;

    const fetchData = async () => {
      const cachedResponse = cacheRef.current[url];

      if (cachedResponse) {
        setData(cachedResponse);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();
        cacheRef.current[url] = json;

        if (ignore === false) {
          setData(json);
        }
      } catch (e: any) {
        if (ignore === false) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error, setData };
}
