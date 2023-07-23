export const formatStatistics = (value: number) => {
  if (value < 10) return value.toString();
  if (value < 100) return `${Math.floor(value / 10) * 10}+`;
  if (value < 1000) return `${Math.floor(value / 100) * 100}+`;
  if (value < 1_000_000) return `${Math.floor(value / 1000)}K+`;
  if (value < 1_000_000_000) return `${Math.floor(value / 1_000_000)}M+`;
};
