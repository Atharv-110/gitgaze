export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };
  const wrappedYear =
    new Date().getMonth() === 11
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;
}
