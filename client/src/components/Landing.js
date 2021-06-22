import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

const Landing = () => {
  const [form, setForm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedBreadths, setSelectedBreadths] = useState([]);

  const OnChange = (e) => {
    setForm(e.target.value);
  };

  const OnDragOver = (e) => {
    e.preventDefault();
    //console.log(e);
  };

  const OnDragStart = (e, id) => {
    console.log(id);
    e.dataTransfer.setData("id", id);
    console.log(e.dataTransfer.getData("id"));
  };

  const OnDragDrop = (e) => {
    const target = e.target.getAttribute("class");
    const id = e.dataTransfer.getData("id");
    console.log(id);
    if (target == "SelectedSubjects") {
      setSelectedSubjects([...selectedSubjects, filteredList[id]]);
    } else if (target == "BreadthSubjects") {
      setSelectedBreadths([...selectedBreadths, filteredList[id]]);
    }
  };

  const getFilteredList = async (sub) => {
    const res = await axios.get(
      `http://localhost:5000/api/getSubjectsFilter/${sub}`
    );
    setFilteredList(res.data);
  };

  useEffect(async () => {
    if (form != "") {
      await getFilteredList(form);
    }
  }, [form]);

  return (
    <div>
      <input type="text" onChange={OnChange} />
      <div style={{ display: "flex" }}>
        <div>
          {filteredList.map((val, i) => {
            return (
              <div
                onDragStart={(e) => {
                  OnDragStart(e, i);
                }}
                draggable
                style={{
                  height: "50px",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                id={i}
              >
                {val.name}
              </div>
            );
          })}
        </div>
        <div
          style={{ height: "400px", width: "200px" }}
          className="SelectedSubjects"
          onDragOver={OnDragOver}
          onDrop={(e) => {
            OnDragDrop(e);
          }}
        >
          {selectedSubjects.map((val, i) => {
            {
              console.log(val);
            }
            return (
              <div
                style={{
                  height: "50px",
                  border: "1px solid black",
                }}
                id={i}
              >
                {val.name}
              </div>
            );
          })}
        </div>
        <div
          style={{ height: "400px", width: "200px" }}
          className="BreadthSubjects"
          onDragOver={OnDragOver}
          onDrop={(e) => {
            OnDragDrop(e);
          }}
        >
          {selectedBreadths.map((val, i) => {
            {
              console.log(val);
            }
            return (
              <div
                style={{
                  height: "50px",
                  border: "1px solid black",
                }}
                id={i}
              >
                {val.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Landing;
