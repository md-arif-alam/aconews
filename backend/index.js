import dotenv from "dotenv";
// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const API_KEY = process.env.API_KEY;

// here we fetch the data of news from gnews.io  API

async function fetchNews(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Successfully !!! data has been fetched",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "API request shows error:",
      error.response ? error.response.data : error
    );
    return {
      status: 500,
      success: false,
      message: "OOPs !!! we couldn't fetch the data",
      error: error.response ? error.response.data : error.message,
    };
  }
}

// getting all the news

app.get("/news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10;
  let page = parseInt(req.query.page) || 1;
  // let q = req.query.q || "top-healines"; // Default search query if none provided

  let url = `https://gnews.io/api/v4/top-headlines?&page=${page}&max=${pageSize}&lang=en&apikey=${API_KEY}`;
  const result = await fetchNews(url);
  res.status(result.status).json(result);
});

// getting news according to categories

app.get("/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "technology";

  let url = `https://gnews.io/api/v4/top-headlines?category=${category}&page=${page}&max=${pageSize}&lang=en&apikey=${API_KEY}`;
  const result = await fetchNews(url);
  res.status(result.status).json(result);
});

//search

app.get("/search", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || " ";

  let url = `https://gnews.io/api/v4/search?q=${category}&lang=en&max=${pageSize}&page=${page}&apikey='=${API_KEY}`;
  const result = await fetchNews(url);
  res.status(result.status).json(result);
});

// getting news according to countries

app.get("/country/:iso", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "technology";
  const country = req.params.iso || "in";

  let url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&page=${page}&max=${pageSize}&lang=en&apikey=${API_KEY}`;

  const result = await fetchNews(url);
  res.status(result.status).json(result);
});

// our local port

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
