export interface RepositoriesResponse {
  repositories: {
    pageInfo: PageInfo;
    nodes: RepositoryNode[];
  };
}

export interface PinnedRepoResponse {
  pinnedItems: {
    nodes: RepositoryNode[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface RepositoryNode {
  name: string;
  description?: string | null;
  url?: string;
  updatedAt?: string;
  homepageUrl?: string | null;
  stargazerCount?: number;
  languages: Languages;
}

export interface RepositoryWithLanguageNames
  extends Omit<RepositoryNode, "languages"> {
  languageNames: string[];
}

export interface Languages {
  edges: LanguageEdge[];
}

export interface LanguageEdge {
  size?: number;
  node: LanguageNode;
}

export interface LanguageNode {
  name: string;
  color?: string | null;
}
