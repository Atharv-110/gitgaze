const BASE_URL = "https://api.github.com/users";

export const searchUser = async (user: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${user}`);
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
