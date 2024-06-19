const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/master`;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

export async function fetchData(query: string, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseBody = await response.json();
  if (responseBody.errors) {
    console.error("GraphQL errors", responseBody.errors);
    throw new Error("Failed to fetch data from GraphQL");
  }

  return responseBody.data;
}
