export const testMaxLvl = (subjects, lvl, max) => {
  let lvl1Subjects = [];
  lvl1Subjects = subjects.filter((subject) => subject.level == lvl);
  return lvl1Subjects.length > max;
};

export const testMinLvl = (subjects, lvl, min) => {
  let lvl1Subjects = [];
  lvl1Subjects = subjects.filter((subject) => subject.level == lvl);
  return lvl1Subjects.length < min;
};

export const testTwoLvl = (subjects, lvl1, lvl2, max) => {
  let Subjects1 = subjects.filter((subject) => subject.level == lvl1);
  let Subjects2 = subjects.filter((subject) => subject.level == lvl2);
  let total = Subjects1.length + Subjects2.length;
  return total > max;
};

export const testBreadth = (breadth) => {
  if (breadth) {
    return breadth.length > 4;
  }
};

export const testBreadthMin = (breadth) => {
  if (breadth) {
    return breadth.length < 4;
  }
};

export const testDiscipline = (subjects) => {
  let a = [];
  let b = [];
  let prev;
  let lvl1Subjects = subjects.filter((subject) => subject.level == 1);

  for (let i = 0; i < lvl1Subjects.length; i++) {
    if (prev == null) {
      a.push(lvl1Subjects[i]);
      b.push(1);
    } else if (lvl1Subjects[i].code != prev.code) {
      console.log(lvl1Subjects[i].code, prev.code);
      a.push(lvl1Subjects[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = lvl1Subjects[i];
  }

  for (let index = 0; index < b.length; index++) {
    if (b[index] > 3) {
      console.log(a[index].code);
      return a[index].code;
    }
  }
  return "";
};
