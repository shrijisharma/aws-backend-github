const mongoose = require("mongoose");

const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createIssue = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    // 1. Repository find karo
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({
        error: "Repository not found!",
      });
    }

    // 2. Issue create karo
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    // 3. Issue save karo
    await issue.save();

    // 4. Repository ke issues array me issue ki ID add karo
    repository.issues.push(issue._id);

    // 5. Repository save karo
    await repository.save();

    res.status(201).json({
      message: "Issue created successfully!",
      issue,
    });

  } catch (err) {
    console.error("Error during issue creation:", err.message);
    res.status(500).send("Server error");
  }
};

// Update Issue
const updateIssueById = async (req, res) => {
  const { id } = req.params;

  const { title, description, status } = req.body;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        error: "Issue not found!",
      });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.json(issue);
  } catch (err) {
    console.error("Error during issue update:", err.message);
    res.status(500).send("Server error");
  }
};

// Delete Issue
const deleteIssueById = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({
        error: "Issue not found!",
      });
    }

    res.json({
      message: "Issue deleted!",
    });
  } catch (err) {
    console.error("Error during issue deletion:", err.message);
    res.status(500).send("Server error");
  }
};

// Get All Issues of a Repository
const getAllIssues = async (req, res) => {
  const { id } = req.params;

  try {
    const issues = await Issue.find({
      repository: id,
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({
        error: "Issues not found!",
      });
    }

    res.status(200).json({
      issues,
    });
  } catch (err) {
    console.error("Error during issue fetching:", err.message);
    res.status(500).send("Server error");
  }
};

// Get Issue By ID
const getIssueById = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        error: "Issue not found!",
      });
    }

    res.status(200).json({
      issue,
    });
  } catch (err) {
    console.error("Error during issue fetching:", err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
