const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//Fetch the list of blogs
const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (error) {
    console.log(e);
  }

  if (!blogList) {
    return res.status(404).json({ message: "No blogs found" });
  }

  return res.status(200).json({ blogList });
};

//Add new Blog
const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

//Delete a Blog
const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);

    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Succefully Deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to Delete! Please try again" });
  }
};

//Update existing Blog

const updateBlog = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;
  let currentBlogToUpdate;

  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({
        message: "Something went wrong while updating! Please try again",
      });
  }

  if (!currentBlogToUpdate) {
    return res.status(404).json({ message: "Unable to Update" });
  }

  return res.status(200).json(currentBlogToUpdate);
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteBlog, updateBlog };
