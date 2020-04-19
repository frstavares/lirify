import { useQuery } from "./useQuery";
import SpotifyWebApi from "spotify-web-api-node";

let spotify: undefined | SpotifyWebApi;

export default function useSpotify() {
  const query = useQuery();

  const accessToken = query.get("accessToken") as string;
  const refreshToken = query.get("refreshToken") as string;

  if (!spotify) {
    spotify = new SpotifyWebApi({
      accessToken,
      refreshToken,
    });
  }

  return spotify;
}
