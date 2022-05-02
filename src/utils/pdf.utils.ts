import PDFDocument from "pdfkit";
import { Response } from "express";

// Entities
import { StudentDocument } from "../Entities/Students.entity";
import { GradesDocument } from "../Entities/Student_Courses.entity";

export function createGradeSheet(
  dataCallback: (chunk: string) => boolean,
  endCallback: () => Response,
  student: StudentDocument,
  grades: GradesDocument[]
) {
  let doc: PDFKit.PDFDocument = new PDFDocument({ size: "A4", margin: 50 });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  generateHeader(doc);
  generateStudentInformation(doc, student);
  generateDataTable(doc, grades);

  doc.end();
}

function generateHeader(doc: PDFKit.PDFDocument) {
  doc
    .image("src/resources/logo.png", 50, 40, { width: 150 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Fisa Matricola", 250, 100)
    .fontSize(10)
    .text(`Universitatea "1 decembrie 1918"`, 200, 50, { align: "right" })
    .text("Gabriel Bethlen Nr.5", 200, 65, { align: "right" })
    .text("Alba Iulia, Alba, 510009", 200, 80, { align: "right" })
    .moveDown();
}

function generateStudentInformation(
  doc: PDFKit.PDFDocument,
  student: StudentDocument
) {
  doc.fillColor("#444444").fontSize(20).text("Date student", 50, 160);

  generateHr(doc, 185);

  const studentInformationTop = 200;

  doc
    .fontSize(10)
    .text("Numar Matricol:", 50, studentInformationTop)
    .font("Helvetica-Bold")
    .text(`${student.students_registrationNumber}`, 150, studentInformationTop)
    .font("Helvetica")
    .text("Nume Prenume:", 50, studentInformationTop + 15)
    .text(
      `${student.students_firstName} ${student.students_lastName}`,
      150,
      studentInformationTop + 15
    )
    .text("CNP:", 50, studentInformationTop + 30)
    .text(`${student.students_cnp}`, 150, studentInformationTop + 30)

    .text("Facultatea:", 300, studentInformationTop)
    .text(student.studyfields_name, 400, studentInformationTop)
    .text("Anul academic:", 300, studentInformationTop + 15)
    .text(`${student.students_academicYear}`, 400, studentInformationTop + 15)
    .text("Data:", 300, studentInformationTop + 30)
    .text(formatDate(new Date()), 400, studentInformationTop + 30)
    .moveDown();

  generateHr(doc, 252);
}

function generateDataTable(doc: PDFKit.PDFDocument, grades: GradesDocument[]) {
  let i;
  const dataTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    dataTableTop,
    "Cod",
    "Denumire",
    "Nota",
    "ECTS",
    "Total ECTS"
  );
  generateHr(doc, dataTableTop + 20);
  doc.font("Helvetica");

  let totalECTS = 0;
  let gradeMean = 0;
  for (i = 0; i < grades.length; i++) {
    const grade = grades[i];
    const position = dataTableTop + (i + 1) * 30;
    totalECTS += grade.courses_ects * grade.finalGrade;
    gradeMean += grade.courses_ects;
    generateTableRow(
      doc,
      position,
      grade.courses_code,
      grade.courses_name,
      `${grade.finalGrade}`,
      `${grade.courses_ects}`,
      `${(grade.courses_ects * grade.finalGrade).toFixed(2)}`
    );

    generateHr(doc, position + 20);
  }

  const totalPosition = dataTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    totalPosition,
    "",
    "",
    "Total ECTS",
    "",
    `${totalECTS}`
  );

  const meanPosition = totalPosition + 20;
  generateTableRow(
    doc,
    meanPosition,
    "",
    "",
    "Media ponderata",
    "",
    `${(totalECTS / gradeMean).toFixed(2)}`
  );
}

function generateTableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  courses_code: string,
  courses_name: string,
  finalGrade: string,
  courses_ects: string,
  total_ects: string
) {
  doc
    .fontSize(10)
    .text(courses_code, 50, y)
    .text(courses_name, 150, y)
    .text(finalGrade, 280, y, { width: 90, align: "right" })
    .text(courses_ects, 370, y, { width: 90, align: "right" })
    .text(total_ects, 0, y, { align: "right" });
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}
