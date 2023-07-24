interface Statistics {
  restaurants: number;
  dishes: number;
  orders: number;
}

export const getStatistics = async (): Promise<Statistics | null> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/statistics';
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('🚧', error);
    return null;
  }
};
