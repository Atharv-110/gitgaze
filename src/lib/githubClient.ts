import axios, { AxiosInstance } from "axios";
import {
  GitHubAPIResponse,
  GitHubGraphQLResponse,
} from "@/types/github/github.types";

const githubAxios: AxiosInstance = axios.create({
  baseURL: process.env.GITHUB_GRAPHQL!,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, br",
    Authorization: `Bearer ${process.env.GITHUB_SECRET_TOKEN}`,
  },
  decompress: true,
  transitional: {
    silentJSONParsing: true,
  },
});

// Keep-alive agent for Node (reduces TLS handshake cost)
import https from "https";

githubAxios.defaults.httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
});

export async function githubRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<GitHubAPIResponse<T>> {
  try {
    const response = await githubAxios.post<GitHubGraphQLResponse<T>>("", {
      query,
      variables,
    });

    const { data, status } = response;

    if (data.errors?.length) {
      return {
        success: false,
        message: data.errors[0].message,
        data: null,
      };
    }

    return {
      success: true,
      message: "OK",
      data: data.data ?? null,
    };
  } catch (error: unknown) {
    console.error("GitHub API Error:", error);

    // Timeout or network failure error
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Network error contacting GitHub",
        data: null,
      };
    }

    return {
      success: false,
      message: "Unexpected server error",
      data: null,
    };
  }
}
