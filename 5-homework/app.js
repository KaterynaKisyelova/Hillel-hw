const students = [
  {
    id: 10,
    name: "John Smith",
    marks: [10, 8, 6, 9, 8, 7],
  },
  {
    id: 11,
    name: "John Doe",
    marks: [9, 8, 7, 6, 7],
  },
  {
    id: 12,
    name: "Thomas Anderson",
    marks: [6, 7, 10, 8],
  },
  {
    id: 13,
    name: "Jean-Baptiste Emanuel Zorg",
    marks: [10, 9, 8, 9],
  },
];
averageStudentMark(10);
averageGroupMark(students);

function averageStudentMark(id) {
  const student = students.find((student) => student.id === id);
  let sum = 0;
  student.marks.forEach((mark) => (sum += mark));
  return sum / student.marks.length;
}

function averageGroupMark(students) {
  let allMarks = [];
  let sum = 0;
  students.forEach((student) => allMarks.push(...student.marks));
  allMarks.forEach((mark) => (sum += mark));
  return sum / allMarks.length;
}
