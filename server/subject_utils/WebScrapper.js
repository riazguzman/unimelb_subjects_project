const express = require("express");
const app = express();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const pool = require("../db_utils/db");

const getSubjectName = async (page, index) => {
  const url = `https://handbook.unimelb.edu.au/search?page=${page}&types%5B%5D=subject&year=2020`;
  const dom = await JSDOM.fromURL(url);
  const document = dom.window.document;
  const subjects = document.querySelectorAll(".search-result-item__name");
  subjects.forEach(async (subject, i) => {
    const name = subject.querySelector("h3").textContent;
    const code = subject.querySelector("span").textContent;
    const insertSubject = await pool.query(
      "INSERT INTO subjects (name, code, level, field) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, code, code[4], code.substring(0, 4)]
    );
  });
};

const SubjectScrapper = async () => {
  for (let index = 1; index <= 313; index++) {
    await getSubjectName(index, subjectList.length);
  }
  return;
};

module.exports = { SubjectScrapper };
