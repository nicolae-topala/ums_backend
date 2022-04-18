/**
 * @openapi
 * components:
 *  schemas:
 *    Student:
 *      type: object
 *      properties:
 *        students_firstName:
 *          type: string
 *        students_lastName:
 *          type: string
 *        students_birthdate:
 *          type: string
 *          format: date-time
 *        students_cnp:
 *          type: string
 *        students_firstNameMother:
 *          type: string
 *        students_firstNameFather:
 *          type: string
 *        students_passport:
 *          type: string
 *        students_idCard:
 *          type: string
 *        students_sex:
 *          type: string
 *        students_citizenship:
 *          type: string
 *        students_nationality:
 *          type: string
 *        students_countryBirth:
 *          type: string
 *        students_cityBirth:
 *          type: string
 *        students_countyBirth:
 *          type: string
 *        students_countryResidence:
 *          type: string
 *        students_cityResidence:
 *          type: string
 *        students_countyResidence:
 *          type: string
 *        students_religion:
 *          type: string
 *        students_minority:
 *          type: boolean
 *        students_maritalStatus:
 *          type: string
 *        students_militarySituation:
 *          type: boolean
 *        students_militaryBooklet:
 *          type: string
 *        students_highschoolGraduation:
 *          type: string
 *          format: date-time
 *        students_highschoolBaccalaureate:
 *          type: number
 *        students_highschoolOlympic:
 *          type: boolean
 *        students_group:
 *          type: string
 *        students_registrationNumber:
 *          type: number
 *        students_admissionGrade:
 *          type: number
 *        students_phone:
 *          type: string
 *        students_email:
 *          type: string
 *        students_academicYear:
 *          type: string
 *          format: date-time
 *        students_studyFieldId:
 *          type: number
 *        studyfields_name:
 *          type: string
 *    Curriculum:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        code:
 *          type: string
 *        name:
 *          type: string
 *        type:
 *          type: string
 *        category:
 *          type: string
 *        gradingSystem:
 *          type: string
 *        semesterNumber:
 *          type: number
 *        yearNumber:
 *          type: number
 *        weeksNumber:
 *          type: number
 *        ects:
 *          type: number
 *        examinationForm:
 *          type: string
 *        minimumGrade:
 *          type: number
 *        studyFieldId:
 *          type: number
 *    Grades:
 *      type: object
 *      properties:
 *        courses_id:
 *          type: number
 *        courses_code:
 *          type: string
 *        courses_name:
 *          type: string
 *        courses_type:
 *          type: string
 *        courses_category:
 *          type: string
 *        courses_gradingSystem:
 *          type: string
 *        courses_semesterNumber:
 *          type: number
 *        courses_yearNumber:
 *          type: number
 *        courses_weeksNumber:
 *          type: number
 *        courses_ects:
 *          type: number
 *        courses_examinationForm:
 *          type: string
 *        courses_minimumGrade:
 *          type: number
 *        courses_studyFieldId:
 *          type: number
 *        finalGrade:
 *          type: number
 */
