export const convertToLocaleDate = (dateTime: string): string => {
  const now = new Date();
  const postDate = new Date(dateTime);
  const timeDiff = now.getTime() - postDate.getTime() - 7_200_000; // Add two hours

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) {
    return "Now";
  } else if (hours < 1) {
    return minutes.toString() + " min";
  } else if (hours > 1 && hours < 24) {
    return hours.toString() + " hours";
  }

  return postDate.toLocaleDateString();
};
