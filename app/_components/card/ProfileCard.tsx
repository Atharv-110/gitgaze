import { memo } from "react";
import AvatarComp from "@/app/_components/@ui/AvatarComp";
import TypographyComp from "../@ui/TypographyComp";

const ProfileCard = () => {
  return (
    <div className="card">
        <div className="w-[120px] rounded-full overflow-hidden">
            <AvatarComp />
        </div>
        <div className="w-[calc(100%-150px)]">
            <TypographyComp variant="title" text="The Octocat" />
            <TypographyComp variant="link" text="Thelink" url="https://github-user-search-app-gold.vercel.app/" />
        </div>
    </div>
  )
}

export default memo(ProfileCard);