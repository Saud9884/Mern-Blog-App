import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending, isEdit, setIsEdit } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function fetchBlogList() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");

    const result = await response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );

    const result = await response.data;

    if (result?.message) {
      fetchBlogList();
    }
  }

  function handleEditBlog(getCurrentBlog) {
    navigate("/add-blog", { state: { getCurrentBlog } });
  }

  useEffect(() => {
    fetchBlogList();
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <div>Loading Blogs, Please wait..</div>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((item) => (
              <div key={item._id}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <FaEdit onClick={() => handleEditBlog(item)} size={20} />
                <FaTrash onClick={() => handleDeleteBlog(item._id)} size={20} />
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
    </div>
  );
}
