export function getStars(avg_rating: number) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (avg_rating >= i) {
      stars.push("full");
    } else if (avg_rating >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return stars;
}

export function formatShortDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${day} ${month}`;
}
