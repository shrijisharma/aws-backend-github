const express = require("express");

const issueController = require("../controllers/issueController");

const issueRouter = express.Router();

// Create issue
issueRouter.post("/issue/create/:id", issueController.createIssue);

// Update issue
issueRouter.put("/issue/updated/:id", issueController.updateIssueById);

// Delete issue
issueRouter.delete("/issue/delete/:id", issueController.deleteIssueById);

// Get all issues of repository
issueRouter.get("/issue/all/:id", issueController.getAllIssues);

// Get issue by ID
issueRouter.get("/issue/:id", issueController.getIssueById);

module.exports = issueRouter;