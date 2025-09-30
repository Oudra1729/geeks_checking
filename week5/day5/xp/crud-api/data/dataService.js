import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts() {
  const response = await axios.get(BASE_URL);
  return response.data;
}
