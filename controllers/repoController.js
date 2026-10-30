const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createRepository = async (req, res) => {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(404).json({ error: "Invalid User ID! " });
    }
    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });
    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository created!",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("Error during repository creation:", err.message);
    res.status(500).send("Server error");
  }
};
async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");
    res.json(repositories);
  } catch (err) {
    console.error("Error during repository creation:", err.message);
    res.status(500).send("Server error");
  }
}
const fetchRepositoryById = async (req, res) => {
  // const{repoID}=req.params.id;
  const { id } = req.params;

  try {
    // const repository = await Repository.find({_id: id })
    const repository = await Repository.findById(id )
      .populate("owner")
      .populate("issues");
    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository:", err.message);
    res.status(500).send("Server error");
  }
};
const fetchRepositoryByName = async (req, res) => {
  const { repoName } = req.params;

  try {
    const repository = await Repository.find({ name: repoName })
      .populate("owner")
      .populate("issues")
      .toArray();
    res.json(repository);
  } catch (err) {
    console.error("Error during repository creation:", err.message);
    res.status(500).send("Server error");
  }
};
const fetchRepositoriesForCurrentUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(req.params);

  try {
    const repositories = await Repository.find({ owner: userId });
    console.log(repositories);
    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User Repositories not found " });
    }
    res.json({ message: "Repositories foundd!", repositories });
  } catch (err) {
    console.error("Error during  fetching user repositories :", err.message);
    res.status(500).send("Server error");
  }
};

const toggleVisibilityById = async (req, res) => {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }
    repository.visibility = !repository.visibility;

    const updateRepository = await repository.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updateRepository,
    });
  } catch (err) {
    console.error("Error during  toggling visibility  :", err.message);
    res.status(500).send("Server error");
  }
};
const updateRepositoryById = async (req, res) => {
  const { id } = req.params;
  const { content, description } = req.body;
  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }
    repository.content.push(content);
    repository.description = description;

    const updateRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updateRepository,
    });
  } catch (err) {
    console.error("Error during  upadting repository :", err.message);
    res.status(500).send("Server error");
  }
};
const deleteRepositoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete({ id });
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }
  } catch (err) {
    console.error("Error during  deleted repository :", err.message);
    res.status(500).send("Server error");
  }
};
module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
