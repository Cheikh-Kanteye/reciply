import { API_KEY, API_URL, APP_ID } from ".";

interface Props {
  type: "public" | "user" | "any";
  query: string;
  from: number;
  to: number;
}

const getRecipes = async ({ query, type, from = 0, to = 10 }: Props) => {
  let recipes = [];
  try {
    const response = await fetch(
      `${API_URL}?type=${type}&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}&from=${from}&to=${to}`
    );
    const data = await response.json();

    if (response.status === 200) {
      recipes = await data?.hits.map((hit: any) => hit);
    } else {
      console.error("Error fetching recipe from api: ", data);
    }
  } catch (error) {
    console.error("Error fetching recipe from api: ", error);
  }
  return [...recipes];
};

export default getRecipes;
