export async function sendRequest(
  url: string,
  { arg }: { arg: Record<string, any> }
) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  return res.json();
}
