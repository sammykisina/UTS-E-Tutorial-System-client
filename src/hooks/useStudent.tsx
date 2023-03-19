import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { APIStudent, StudentData } from '../types/typings.t';
import { StudentAPI } from '@/api';
import { FC, useMemo } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Button, DeleteStudent, Toasts } from '@/components';
import { studentAtoms } from '@/atoms';
import { useSetRecoilState } from 'recoil';

const useStudent = () => {
  /**
   * component states
   */
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const studentColumns = useMemo<
    ColumnDef<{
      id: number;
      regNumber: string;
      name: string;
      email: string;
      createdAt: string;
    }>[]
  >(
    () => [
      {
        header: 'Reg Number',
        accessorKey: 'regNumber',
      },
      {
        header: 'Course',
        accessorKey: 'course',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
      },
      {
        header: 'Action',
        accessorKey: 'action',
        cell: ({ row }) => <Actions row={row} />,
      },
    ],
    []
  );
  const {
    showCreateOrEditStudentWidgetState,
    globalStudentState,
    isEditingStudentState,
  } = studentAtoms;
  const setShowCreateOrEditStudentWidget = useSetRecoilState(
    showCreateOrEditStudentWidgetState
  );
  const setGlobalStudent = useSetRecoilState(globalStudentState);
  const setIsEditingStudent = useSetRecoilState(isEditingStudentState);

  /**
   * component functions
   */
  const Actions: FC<{
    row: Row<{
      regNumber: string;
      name: string;
      email: string;
      createdAt: string;
      id: number;
    }>;
  }> = ({ row }) => {
    return (
      <section className='flex gap-2'>
        <Button
          title='EDIT'
          type='button'
          intent='primary'
          purpose={() => {
            setShowCreateOrEditStudentWidget(true);
            setGlobalStudent(row.original);
            setIsEditingStudent(true);
          }}
        />

        <DeleteStudent studentId={row?.original?.id} />
      </section>
    );
  };

  const { data: students, isLoading: isFetchingStudents } = useQuery({
    queryKey: ['students', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin') {
        return (await StudentAPI.getStudents()) as APIStudent[];
      }

      return [];
    },
  });

  const modifyStudentsDataForStudentsTable = (
    students: APIStudent[] | undefined
  ) => {
    let modifiedStudentsData = [] as unknown[];

    students?.map((student) => {
      modifiedStudentsData = [
        ...modifiedStudentsData,
        {
          regNumber: student?.attributes?.regNumber,
          id: student?.id,
          name: student?.attributes?.name,
          email: student?.attributes?.email,
          course: student?.relationships?.course?.attributes?.name,
          createdAt: format(
            new Date(student?.attributes?.createdAt),
            'EE, MMM d, yyy'
          ),
        },
      ];
    });

    return modifiedStudentsData;
  };

  const {
    mutateAsync: createStudentMutateAsync,
    isLoading: isCreatingStudent,
  } = useMutation({
    mutationFn: (studentNewData: StudentData) => {
      return StudentAPI.createStudent(studentNewData);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setShowCreateOrEditStudentWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: updateStudentMutateAsync,
    isLoading: isUpdatingStudent,
  } = useMutation({
    mutationFn: (data: {
      studentId: number;
      studentUpdateData: StudentData;
    }) => {
      return StudentAPI.updateStudent(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setShowCreateOrEditStudentWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: deleteStudentMutateAsync,
    isLoading: isDeletingStudent,
  } = useMutation({
    mutationFn: (studentId: number) => {
      return StudentAPI.deleteStudent(studentId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      Toasts.successToast(data.message);
    },
  });

  return {
    students,
    isFetchingStudents,
    studentColumns,
    modifyStudentsDataForStudentsTable,
    createStudentMutateAsync,
    isCreatingStudent,
    updateStudentMutateAsync,
    isUpdatingStudent,
    isDeletingStudent,
    deleteStudentMutateAsync,
  };
};

export default useStudent;
