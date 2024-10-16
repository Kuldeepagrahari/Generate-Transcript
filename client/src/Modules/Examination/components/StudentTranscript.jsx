/* eslint-disable no-use-before-define */
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function StudentTranscript() {
  const studentData = {
    rollNo: "20BSM004",
    name: "ADITYA RAMESH GANTI",
    programme: "Bachelor of Technology",
    discipline: "Smart Manufacturing",
    semester: "VIII",
    academicYear: "2023-24",
    courses: [
      {
        courseNo: "CS1001",
        courseTitle: "DSA",
        credits: "4",
        grade: "A",
      },
      {
        courseNo: "CS1002",
        courseTitle: "DBMS",
        credits: "4",
        grade: "B",
      },
      {
        courseNo: "CS1003",
        courseTitle: "Computer Networks",
        credits: "4",
        grade: "A+",
      },
      {
        courseNo: "CS1004",
        courseTitle: "Operating System",
        credits: "4",
        grade: "B+",
      },
      {
        courseNo: "CS1005",
        courseTitle: "Software Engineering",
        credits: "4",
        grade: "A",
      },
    ],
    semesterPerformance: [
      { semester: "I", spi: "7.5", cpi: "7.5" },
      { semester: "II", spi: "6.7", cpi: "7.0" },
      { semester: "III", spi: "6.7", cpi: "6.9" },
      { semester: "IV", spi: "6.4", cpi: "6.8" },
      { semester: "V", spi: "7.6", cpi: "6.9" },
      { semester: "VI", spi: "6.4", cpi: "6.8" },
      { semester: "VII", spi: "4.1", cpi: "6.5" },
      { semester: "VIII", spi: "7.6", cpi: "6.6" },
    ],
    finalCPI: "6.6",
  };

  const generatePDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.setFont("helvetica");

    // Header with student info
    doc.setFontSize(14);
    doc.text("Student Transcript", 105, 10, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Roll No: ${studentData.rollNo}`, 20, 20);
    doc.text(`Student Name: ${studentData.name}`, 20, 30);
    doc.text(`Programme: ${studentData.programme}`, 120, 20);
    doc.text(`Discipline: ${studentData.discipline}`, 120, 30);
    doc.text(`Semester: ${studentData.semester}`, 120, 40);
    doc.text(`Academic Year: ${studentData.academicYear}`, 120, 50);

    // Courses Table
    doc.autoTable({
      startY: 60,
      head: [["Course No.", "Course Title", "Credits", "Grade"]],
      body: studentData.courses.map((course) => [
        course.courseNo,
        course.courseTitle,
        course.credits,
        course.grade,
      ]),
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
    });

    // Grading Points and Symbols
    doc.setFontSize(10);
    doc.text("Grading Points:", 20, doc.lastAutoTable.finalY + 10);
    doc.setFontSize(8);
    const gradingPoints =
      "O=10 (Distinguished), A+=10 (Outstanding), A=9 (Excellent), B+=8 (Very Good), B=7 (Good), C+=6 (Average), C=5 (Below Average), D+=4 (Marginal), D=3 (Poor), F=2 (Very Poor), I=0 (Incomplete)";
    doc.text(gradingPoints, 20, doc.lastAutoTable.finalY + 20, {
      maxWidth: 170,
    });

    // Special Symbols
    doc.setFontSize(10);
    doc.text("Special Symbols:", 20, doc.lastAutoTable.finalY + 30);
    doc.setFontSize(8);
    const specialSymbols = [
      "SPI: Semester Performance Index",
      "CPI: Cumulative Performance Index",
      "'AU' indicates that the course has been Audited.",
      "'CD' indicates that the course has been Dropped due to a shortage of attendance.",
      "'R' after letter grade indicates that the course has been Repeated.",
      "'S' after letter grade indicates that the course has been Substituted.",
    ];
    specialSymbols.forEach((symbol, index) => {
      doc.text(symbol, 20, doc.lastAutoTable.finalY + 40 + index * 5);
    });

    // Semester Performance Table (SPI/CPI)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 80,
      head: [
        [
          "Semester",
          ...studentData.semesterPerformance.map((sem) => sem.semester),
          "Final",
        ],
      ],
      body: [
        ["SPI", ...studentData.semesterPerformance.map((sem) => sem.spi), ""],
        [
          "CPI",
          ...studentData.semesterPerformance.map((sem) => sem.cpi),
          studentData.finalCPI,
        ],
      ],
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
    });

    // Additional Notes
    doc.setFontSize(10);
    doc.text(
      "* Medium of instruction is English",
      20,
      doc.lastAutoTable.finalY + 20,
    );
    doc.text(
      "* Conversion from CPI to Percentage using (CPI*10)% formula",
      20,
      doc.lastAutoTable.finalY + 30,
    );
    doc.text(
      "Student has successfully completed the programme.",
      20,
      doc.lastAutoTable.finalY + 40,
    );
    doc.text("Minimum Graduating CPI: 5.0", 20, doc.lastAutoTable.finalY + 50);
    doc.text("Maximum Graduating CPI: 10.0", 20, doc.lastAutoTable.finalY + 60);

    // Footer
    doc.text(`Issued on Jul 22, 2024`, 20, doc.lastAutoTable.finalY + 80);
    doc.text("Assistant/Deputy Registrar", 150, doc.lastAutoTable.finalY + 80);

    // Save PDF
    doc.save(`Transcript_${studentData.rollNo}.pdf`);
  };

  return (
    // eslint-disable-next-line no-use-before-define
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <p>
            <strong>Roll No:</strong> {studentData.rollNo}
          </p>
          <p>
            <strong>Student Name:</strong> {studentData.name}
          </p>
        </div>
        <div>
          <p>
            <strong>Programme:</strong> {studentData.programme}
          </p>
          <p>
            <strong>Discipline:</strong> {studentData.discipline}
          </p>
          <p>
            <strong>Semester:</strong> {studentData.semester}
          </p>
          <p>
            <strong>Academic Year:</strong> {studentData.academicYear}
          </p>
        </div>
      </div>

      {/* Courses Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Course No.</th>
            <th>Course Title</th>
            <th>Credits</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {studentData.courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseNo}</td>
              <td>{course.courseTitle}</td>
              <td>{course.credits}</td>
              <td>{course.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Semester Performance Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Semester</th>
            {studentData.semesterPerformance.map((sem) => (
              <th key={sem.semester}>{sem.semester}</th>
            ))}
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SPI</td>
            {studentData.semesterPerformance.map((sem) => (
              <td key={sem.semester}>{sem.spi}</td>
            ))}
            <td />
          </tr>
          <tr>
            <td>CPI</td>
            {studentData.semesterPerformance.map((sem) => (
              <td key={sem.semester}>{sem.cpi}</td>
            ))}
            <td>{studentData.finalCPI}</td>
          </tr>
        </tbody>
      </table>

      {/* Download PDF Button */}
      <button onClick={generatePDF} style={styles.button}>
        Download as PDF
      </button>
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    maxWidth: "800px",
    margin: "5vh auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default StudentTranscript;
