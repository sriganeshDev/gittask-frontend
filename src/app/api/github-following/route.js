import { authToken } from "@/services";

export async function POST(req) {
  const { username } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_GIT_URL}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          user(login: "${username}") {
            following(first: 20) {
              nodes {
                login
                name
                avatarUrl
                location
                company
                bio
                url
              }
            }
          }
        }
      `,
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data.data.user.following.nodes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
