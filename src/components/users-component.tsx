import ProfileCard from "./bento-cards/profile-card";

const UsersComponent = () => {
  const cardCount = 18;

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: cardCount }).map((_, index) => (
        <div key={index} className="min-h-60">
          <ProfileCard />
        </div>
      ))}
    </div>
  );
};

export default UsersComponent;
