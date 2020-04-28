import React, { useEffect, useState } from "react";
import history from "../../tools/history";
import { useQuery } from "../../tools/useQuery";
import fetch from "node-fetch";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3005";

export default function Home() {
  const [lyrics, setLyrics] = useState();
  const [playerState, setPlayedState] = useState();
  const query = useQuery();

  useEffect(() => {
    const changeSong = async () => {
      if (!playerState) {
        return;
      }

      const songName = (playerState as any).track_window.current_track.name;
      const artistName = (playerState as any).track_window.current_track
        .artists[0].name;

      const searchResults = await fetch(
        `${apiUrl}/lyrics?q=${encodeURI(`${artistName} ${songName}`)}`
      );

      if (searchResults) {
        const response = await searchResults.json();

        if (response && response.lyrics) {
          setLyrics(response.lyrics);
        }
      }
    };

    changeSong();
  }, [playerState]);

  useEffect(() => {
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const token = query.get("accessToken") as string;
      const player = new Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb: any) => {
          cb(token);
        },
      });

      const play = (playerInstance: {
        _options: {
          getOAuthToken: any;
          id: string;
        };
      }) => {
        playerInstance._options.getOAuthToken(async (token: string) => {
          const currentlyPlayingRequest = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (currentlyPlayingRequest.status === 200) {
            const currentlyPlaying = await currentlyPlayingRequest.json();

            if (currentlyPlaying) {
              await fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${playerInstance._options.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    uris: [currentlyPlaying.item.uri],
                    position_ms: currentlyPlaying.progress_ms,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }
          }
        });
      };

      // Error handling
      player.addListener("initialization_error", (error: any) => {
        console.error("initialization_error", error);
      });

      player.addListener("authentication_error", (error: any) => {
        console.error("authentication_error", error);
        history.push("/");
      });

      player.addListener("account_error", (error: any) => {
        console.error("account_error", error);
        history.push("/");
      });

      player.addListener("playback_error", (error: any) => {
        console.error("playback_error", error);
      });

      // Playback status updates
      player.addListener("player_state_changed", async (state: any) => {
        console.log("player_state_changed", state);

        if (state !== playerState) {
          setPlayedState(state);
        }
      });

      // Ready
      player.addListener("ready", (args: { device_id: string }) => {
        console.log("Ready...");
        console.log(args);

        play(player);
      });

      // Not Ready
      player.addListener("not_ready", (args: { device_id: string }) => {
        console.log("Device ID has gone offline");
        console.log(args);
      });

      // Connect to the player!
      player.connect().then((success: any) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };
  }, [playerState, query]);

  return lyrics ? <div>{lyrics}</div> : null;
}
