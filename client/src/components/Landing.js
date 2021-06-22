import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import ErrorContainer from "./ErrorContainer";

// Styling component container
const ElectivesContainer = styled.div`
  ${({ theme }) => `
    padding: 10px;
    height: 80vh;
    overflow-y: auto;
    width: 90%;
    margin-right: 20px;
    margin-top: 10px;
    background-color: #97A3D1;
    background-opacity: 20%;
    border-radius: 5px;
    border: 1px solid black;

    ::-webkit-scrollbar {
      width: 3px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 30px #97A3D1;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #606060;
      border-radius: 10px;
    }

      
  `}
`;

const FilterContainer = styled.div`
  height: 80vh;
  overflow-y: auto;
  width: 90%;
  padding: 10px;
  background-color: #97a3d1;
  border-radius: 5px;
  border: 1px solid black;
  margin-top: 10px;

  ::-webkit-scrollbar {
    width: 3px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 30px #97a3d1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #606060;
    border-radius: 10px;
  }
`;

const Landing = () => {
  const [form, setForm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [scienceElective, setScienceElective] = useState([]);
  const [selectedBreadths, setSelectedBreadths] = useState([]);
  const [scienceOrBreadth, setScienceOrBreadth] = useState([]);
  const [coreSubjects, setCoreSubjects] = useState([]);

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
    const target = e.target.getAttribute("name");
    const id = e.dataTransfer.getData("id");
    console.log(id);
    console.log("here");
    if (target == "ScienceElective") {
      setScienceElective([...scienceElective, filteredList[id]]);
    } else if (target == "BreadthSubjects") {
      setSelectedBreadths([...selectedBreadths, filteredList[id]]);
    } else if (target == "ScienceOrBreadth") {
      setScienceOrBreadth([...scienceOrBreadth, filteredList[id]]);
    } else if (target == "CoreSubjects") {
      setCoreSubjects([...coreSubjects, filteredList[id]]);
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
      <div style={{ marginTop: "10px", display: "flex" }}>
        <div style={{ width: "20%" }}>
          <input
            placeholder="Search for subject here!"
            onChange={OnChange}
            style={{
              borderRadius: "5px",
              border: "1px solid black",
              width: "95%",
            }}
          />
          <ElectivesContainer>
            {filteredList.map((val, i) => {
              if (i > 50) {
                filteredList.length = 51;
              }
              return (
                <div
                  onDragStart={(e) => {
                    OnDragStart(e, i);
                  }}
                  draggable
                  style={{
                    border: "1px solid black",
                    cursor: "pointer",
                    marginBottom: "10px",
                    padding: "5px",
                    fontSize: "12px",
                    borderRadius: "5px",
                    background: "#E7EAF7",
                  }}
                  id={i}
                >
                  <p style={{ fontWeight: "bold" }}>{val.name}</p>
                  <p>level: {val.level}</p>
                  <p>field: {val.field}</p>
                </div>
              );
            })}
          </ElectivesContainer>
        </div>
        <div style={{ width: "60%", display: "flex" }}>
          <div style={{ width: "33%" }}>
            <div>Electives</div>
            <FilterContainer
              name="ScienceElective"
              onDragOver={OnDragOver}
              onDrop={(e) => {
                OnDragDrop(e);
              }}
            >
              {scienceElective.length == 0 && (
                <div>Drag and drop science electives here</div>
              )}
              {scienceElective.map((val, i) => {
                return (
                  <div
                    name="ScienceElective"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      background: "#E7EAF7",
                    }}
                    id={i}
                  >
                    <p name="ScienceElective" style={{ fontWeight: "bold" }}>
                      {val.name}
                    </p>
                    <p name="ScienceElective">level: {val.level}</p>
                    <p name="ScienceElective">field: {val.field}</p>
                  </div>
                );
              })}
            </FilterContainer>
          </div>
          <div style={{ width: "33%" }}>
            <div>Breadths</div>
            <FilterContainer
              name="BreadthSubjects"
              onDragOver={OnDragOver}
              onDrop={(e) => {
                OnDragDrop(e);
              }}
            >
              {selectedBreadths.length == 0 && (
                <div>Drag and drop breadth subjects here</div>
              )}
              {selectedBreadths.map((val, i) => {
                return (
                  <div
                    name="BreadthSubjects"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      background: "#E7EAF7",
                    }}
                    id={i}
                  >
                    <p style={{ fontWeight: "bold" }}>{val.name}</p>
                    <p>level: {val.level}</p>
                    <p>field: {val.field}</p>
                  </div>
                );
              })}
            </FilterContainer>
          </div>
          <div style={{ width: "33%" }}>
            <div>Breadth or Science Electives</div>
            <FilterContainer
              style={{ height: "35vh" }}
              name="ScienceOrBreadth"
              onDragOver={OnDragOver}
              onDrop={(e) => {
                OnDragDrop(e);
              }}
            >
              {scienceOrBreadth.length == 0 && (
                <div>Drag and drop breadth or science electives here</div>
              )}
              {scienceOrBreadth.map((val, i) => {
                return (
                  <div
                    name="ScienceOrBreadth"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      background: "#E7EAF7",
                    }}
                    id={i}
                  >
                    <p name="ScienceOrBreadth" style={{ fontWeight: "bold" }}>
                      {val.name}
                    </p>
                    <p name="ScienceOrBreadth">level: {val.level}</p>
                    <p name="ScienceOrBreadth">field: {val.field}</p>
                  </div>
                );
              })}
            </FilterContainer>
            <div style={{ marginTop: "20px" }}>Core Subjects</div>
            <FilterContainer
              style={{ height: "35vh" }}
              name="CoreSubjects"
              onDragOver={OnDragOver}
              onDrop={(e) => {
                OnDragDrop(e);
              }}
            >
              {coreSubjects.length == 0 && (
                <div>Drag and drop core subjects here</div>
              )}
              {coreSubjects.map((val, i) => {
                return (
                  <div
                    name="CoreSubjects"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      background: "#E7EAF7",
                    }}
                    id={i}
                  >
                    <p name="CoreSubjects" style={{ fontWeight: "bold" }}>
                      {val.name}
                    </p>
                    <p name="CoreSubjects">level: {val.level}</p>
                    <p name="CoreSubjects">field: {val.field}</p>
                  </div>
                );
              })}
            </FilterContainer>
          </div>
        </div>
        <ErrorContainer subjects={scienceElective} breadth={selectedBreadths} />
      </div>
    </div>
  );
};
export default Landing;
