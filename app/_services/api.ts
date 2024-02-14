import axios from "axios";
import { IData } from "@/app/_interface/iData";

const BASE_URL = "https://api.github.com/users";

export const searchUser = async (user: string) => {
  try {
    const res = await axios.get<IData>(`${BASE_URL}/${user}`);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
