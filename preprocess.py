import pandas as pd

df = pd.read_csv('data/All_Spotify_Streaming_History.csv')

df = df[df["Conn Country"] == "US"]

df["timestamp (clean)"] = pd.to_datetime(df["Timestamp (PST)"])
df["hour"] = df["timestamp (clean)"].dt.hour

grouped = df.groupby("hour").agg(
    minutesPlayed = ("Minutes Played", "sum"),
    skipRate = ("Skip Rate", "mean"),
    shuffleRate = ("Shuffle Rate", "mean"),
    desktopShare = ("Platform", lambda x: x.str.contains("desktop", case=False, na=False).mean()),
    mobileShare = ("Platform", lambda x: (x == "mobile").mean())
).reset_index()

grouped = grouped.round(3)

print(grouped.head())
grouped.to_json("hourly_spotify_data.json", orient = "records")

# print(df.head())