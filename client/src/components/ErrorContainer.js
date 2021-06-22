import React, { useState, useEffect } from "react";
import ErrorCard from "./ErrorCard";

import {
  testMaxLvl,
  testMinLvl,
  testDiscipline,
  testTwoLvl,
  testBreadth,
  testBreadthMin,
} from "../Functions/validationFunctions";

export const ErrorContainer = ({ subjects, breadth }) => {
  const [maxLevel1Error, setMaxLevel1Error] = useState(false);
  const [minLevel1Error, setMinLevel1Error] = useState(false);
  const [maxLevel2Error, setMaxLevel2Error] = useState(false);
  const [minLevel2Error, setMinLevel2Error] = useState(false);
  const [maxLevel3Error, setMaxLevel3Error] = useState(false);
  const [minLevel3Error, setMinLevel3Error] = useState(false);
  const [singleDisciplineError, setSingleDisciplineError] = useState("");
  const [maxLevel1and2Error, setMaxLevel1and2Error] = useState(false);
  const [maxLevel1and3Error, setMaxLevel1and3Error] = useState(false);
  const [maxLevel2and3Error, setMaxLevel2and3Error] = useState(false);
  const [minfourBreadths, setMinFourBreadths] = useState(false);
  const [fourBreadths, setFourBreadths] = useState(false);
  const [maxLevel1Breadth, setMaxLevel1Breadth] = useState(false);
  const [scienceAndBreadth, setScienceAndBreadth] = useState(false);

  useEffect(() => {
    setMaxLevel1Error(testMaxLvl(subjects, 1, 7));
    setMinLevel1Error(testMinLvl(subjects, 1, 5));
    setMaxLevel2Error(testMaxLvl(subjects, 2, 7));
    setMinLevel2Error(testMinLvl(subjects, 2, 5));
    setMaxLevel3Error(testMaxLvl(subjects, 3, 4));
    setMinLevel3Error(testMinLvl(subjects, 3, 2));
    setSingleDisciplineError(testDiscipline(subjects));
    setMaxLevel1and2Error(testTwoLvl(subjects, 1, 2, 12));
    setMaxLevel1and3Error(testTwoLvl(subjects, 1, 3, 9));
    setMaxLevel2and3Error(testTwoLvl(subjects, 2, 3, 9));
  }, [subjects]);

  useEffect(() => {
    setFourBreadths(testBreadth(breadth));
    setMaxLevel1Breadth(testMaxLvl(breadth, 1, 3));
    setMinFourBreadths(testBreadthMin(breadth));
  }, [breadth]);

  return (
    <div>
      {maxLevel1Error && (
        <ErrorCard
          title="Too many lvl 1 subjects"
          body="Remove some lvl 1 subjects."
        />
      )}
      {minLevel1Error && (
        <ErrorCard
          title="Not Enough lvl 1 subjects"
          body="Enter some lvl 1 subjects."
        />
      )}
      {maxLevel2Error && (
        <ErrorCard
          title="Too many lvl 2 subjects"
          body="Remove some lvl 2 subjects."
        />
      )}
      {minLevel2Error && (
        <ErrorCard
          title="Not Enough lvl 2 subjects"
          body="Enter some lvl 2 subjects."
        />
      )}
      {maxLevel3Error && (
        <ErrorCard
          title="Too many lvl 3 subjects"
          body="Remove some lvl 3 subjects."
        />
      )}
      {minLevel3Error && (
        <ErrorCard
          title="Not Enough lvl 3 subjects"
          body="Enter some lvl 3 subjects."
        />
      )}
      {singleDisciplineError !== "" && (
        <ErrorCard
          title="Too many lvl 1 science subjects from the same discipline"
          body="Remove some subjects from single discipline."
        />
      )}
      {maxLevel1and2Error && (
        <ErrorCard
          title="Too many lvl 1 and 2 subjects"
          body="Remove some lvl 1 and 2 subjects."
        />
      )}
      {maxLevel1and3Error && (
        <ErrorCard
          title="Too many lvl 1 and 3 subjects"
          body="Remove some lvl 1 and 3 subjects."
        />
      )}
      {maxLevel2and3Error && (
        <ErrorCard
          title="Too many lvl 2 and 3 subjects"
          body="Remove some lvl 2 and 3 subjects."
        />
      )}
      {fourBreadths && (
        <ErrorCard title="Too many breadths" body="Remove breadths." />
      )}
      {minfourBreadths && (
        <ErrorCard title="Not Enough breadths" body="Add some breadths." />
      )}
      {maxLevel1Breadth && (
        <ErrorCard title="Too many lvl 1 breadths" body="Remove breadths." />
      )}
    </div>
  );
};

export default ErrorContainer;
