import { GitHubAPIResponse, GitHubGraphQLResponse } from "@/types/github";
import axios from "axios";

export async function githubRequest<T>(
  query: string,
  variables?: Record<string, string | number | boolean>
): Promise<GitHubAPIResponse<T>> {
  try {
    const { data } = await axios.post<GitHubGraphQLResponse<T>>(
      process.env.GITHUB_GRAPHQL!,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_SECRET_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.errors && data.errors.length > 0) {
      return {
        success: false,
        message: data.errors[0].message || "GitHub GraphQL error",
        data: null,
      };
    }

    return {
      success: true,
      message: "OK",
      data: data.data ?? null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Server error while fetching from GitHub",
      data: null,
    };
  }
}
