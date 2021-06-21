const express = require("express");
const app = express();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const getSubjectName = async (page, index) => {
  const subjectList = [];
  const url = `https://handbook.unimelb.edu.au/search?page=${page}&types%5B%5D=subject&year=2020`;
  console.log(url);
  const dom = await JSDOM.fromURL(url);
  const document = dom.window.document;
  const subjects = document.querySelectorAll(".search-result-item__name");
  subjects.forEach((subject, i) => {
    const name = subject.querySelector("h3").textContent;
    const code = subject.querySelector("span").textContent;
    const subjectInfo = {
      name,
      code,
      level: code[4],
      index: i + index,
    };
    subjectList.push(subjectInfo);
  });
  return subjectList;
};

const getSubjectNameEveryPage = async () => {
  let subjectList = [];
  for (let index = 1; index < 313; index++) {
    const subjects = await getSubjectName(index, subjectList.length);
    subjectList = subjectList.concat(subjects);
  }
  fs.writeFile(
    "C:/Users/Guzman/repos/new_subject_planner/client/src/subject-utils/newData.json",
    JSON.stringify(subjectList),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
  return;
};

module.exports = { getSubjectNameEveryPage };
