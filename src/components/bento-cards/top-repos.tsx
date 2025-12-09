"use client";
import React from "react";
import Card from "@/components/card";
import Button from "@/components/ui/button";
import LanguageIcon, { LanguageKey } from "@/components/ui/language-icon";
import useGhTopRepos from "@/hooks/useGhTopRepos";
import { RepositoryWithLanguageNames } from "@/types/github/repositories.types";
import Link from "next/link";

const RepositoryCard = ({
  repository,
}: {
  repository: RepositoryWithLanguageNames;
}) => {
  return (
    <div className="border border-slate-200 shadow-sm px-3 py-2 rounded-lg space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-stretch gap-x-2">
          <Link
            href={repository.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
          >
            {repository.name}
          </Link>
          <div className="flex items-center gap-x-1">
            {repository.languageNames.map((lang) => (
              <LanguageIcon key={lang} size={14} name={lang as LanguageKey} />
            ))}
          </div>
        </div>
        {repository.homepageUrl && (
          <Button
            icon="GlobeAltIcon"
            size={14}
            className="bg-transparent p-0"
            color="text-slate-500 hover:text-slate-700"
            onClick={() =>
              window.open(
                repository.homepageUrl!,
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
        )}
      </div>

      <p className="text-xs text-slate-600 line-clamp-2">
        {repository.description ?? "No description provided."}
      </p>
    </div>
  );
};

const TopRepos = ({ username }: { username: string }) => {
  const [data, setData] = React.useState<RepositoryWithLanguageNames[] | null>(
    null
  );
  const { data: fetchedData, isLoading } = useGhTopRepos(username);
  React.useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);
  return (
    <Card cardTitle={"Top Repositories"} iconName={"BriefcaseIcon"}>
      <div className="space-y-2.5 flex-1 overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {data?.map((repo) => (
          <RepositoryCard key={repo.name} repository={repo} />
        ))}
      </div>
    </Card>
  );
};

export default TopRepos;
