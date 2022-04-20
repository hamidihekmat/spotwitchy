type SubmitCredentialsResponse = {
  redirect_url: string;
};

export async function submitCredentials({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  const response = await fetch('/api/spotify/activate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
    }),
  });

  return (await response.json()) as SubmitCredentialsResponse;
}
