import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import ErrorContainer from "./ErrorContainer";

// Styling component container
const ElectivesContainer = styled.div`
  ${({ theme }) => `
    padding: 10px;
    height: 90vh;
    overflow-y: auto;
    width: 20%;
    margin-right: 20px;
    margin-top: 20px;
    background-color: #C0C0C0;

    ::-webkit-scrollbar {
      width: 3px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 30px #C0C0C0;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #606060;
      border-radius: 10px;
    }

      
  `}
`;

const FilterContainer = styled.div`
  height: 90vh;
  overflow-y: auto;
  width: 90%;
  padding: 10px;
  background-color: #c0c0c0;

  ::-webkit-scrollbar {
    width: 3px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 30px #c0c0c0;
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
      <div style={{ display: "flex" }}></div>
      <div style={{ marginTop: "10px", display: "flex" }}>
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
        <div style={{ width: "80%", display: "flex" }}>
          <div style={{ width: "33%" }}>
            <div>Electives</div>
            <FilterContainer
              name="ScienceElective"
              onDragOver={OnDragOver}
              onDrop={(e) => {
                OnDragDrop(e);
              }}
            >
              {scienceElective.map((val, i) => {
                return (
                  <div
                    name="ScienceElective"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
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
              {selectedBreadths.map((val, i) => {
                {
                  console.log(val);
                }
                return (
                  <div
                    name="BreadthSubjects"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
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
              name="ScienceOrBreadth"
              onDragOver={OnDragOver}
              onDrop={(e) => {
                OnDragDrop(e);
              }}
            >
              {scienceOrBreadth.map((val, i) => {
                {
                  console.log(val);
                }
                return (
                  <div
                    name="ScienceOrBreadth"
                    style={{
                      border: "1px solid black",
                      marginBottom: "10px",
                      padding: "5px",
                      fontSize: "12px",
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
        </div>
        <ErrorContainer subjects={scienceElective} breadth={selectedBreadths} />
      </div>
    </div>
  );
};
export default Landing;
