class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  getAverageMark() {
    return this.getMarksSum() / this.marks.length;
  }

  getMarksSum() {
    return this.marks.reduce((sum, mark) => (sum += mark));
  }
}

class Group {
  students = [];

  addStudent(student) {
    if (this.isStudent(student)) {
      const averageMark = student.getAverageMark();

      this.students.push({ name: student.name, averageMark });
    }
  }

  isStudent(student) {
    return student instanceof Student;
  }

  getAverageMark() {
    return this.getAverageMarksSum() / this.students.length;
  }

  getAverageMarksSum() {
    return this.students.reduce(
      (sum, student) => (sum += student.averageMark),
      0
    );
  }
}

const group = new Group();

group.addStudent(new Student("John", [10, 8]));
group.addStudent(new Student("Alex", [10, 9]));
group.addStudent(new Student("Bob", [6, 10]));
group.addStudent({});

console.log(group.getAverageMark() === (9 + 9.5 + 8) / 3);
