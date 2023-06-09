import { Result, StudentData } from '../types/typings.t';
import { API } from './api';

const StudentAPI = {
  getStudents: async () =>
    API.get('/admin/students?include=course&filter[role.slug]=student'),
  createStudent: async (studentNewData: StudentData) =>
    API.post('/admin/students', studentNewData),
  updateStudent: async (data: {
    studentId: number;
    studentUpdateData: StudentData;
  }) => API.patch(`/admin/students/${data.studentId}`, data.studentUpdateData),
  deleteStudent: async (studentId: number) =>
    API.delete(`/admin/students/${studentId}`),

  createTutorialResult: async (studentTutorialResultData: Result) =>
    API.post('/student/tutorials/results', studentTutorialResultData),
};

export default StudentAPI;
