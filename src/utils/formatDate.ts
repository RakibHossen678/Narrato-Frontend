import { formatDistanceToNowStrict } from "date-fns";

export const formatTimeAgo = (date: string): string =>
  `${formatDistanceToNowStrict(new Date(date))} ago`;
