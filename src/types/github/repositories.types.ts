export interface RepositoriesResponse {
  repositories: {
    pageInfo: PageInfo;
    nodes: RepositoryNode[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface RepositoryNode {
  name: string;
  languages: Languages;
}

export interface Languages {
  edges: LanguageEdge[];
}

export interface LanguageEdge {
  size: number;
  node: LanguageNode;
}

export interface LanguageNode {
  name: string;
  color: string | null;
}
