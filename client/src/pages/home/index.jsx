import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  async function fetchBlogList() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");

    const result = await response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    }
  }

  useEffect(() => {
    fetchBlogList();
  }, []);
  return (
    <div>
      <h1>Blog List</h1>
      {
        pending ? <div>Loading Blogs, Please wait..</div> : <div>{blogList.map((item) => (
          <div key={item._id}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            </div>
        ))}</div>
      }
      
    </div>
  );
}
