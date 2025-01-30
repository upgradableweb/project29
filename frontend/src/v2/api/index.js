import FetchIt from "./FetchIt";


const token_verify = new FetchIt("/token-verify")

export const Token = {
    verify: () => token_verify.get()
}

const teachers_students = new FetchIt('/v2/dashboard/teachers-students')
const dash_subjects = new FetchIt('/v2/dashboard/subjects')
const dash_branches = new FetchIt('/v2/dashboard/branches')


export const Admin_Dashboard = {
    getStudentTeacherCount: () => teachers_students.post(),
    getSubjectsCount: () => dash_subjects.post(),
    getBranchesCount: () => dash_branches.post()
}


const semister = new FetchIt('/v2/semister')
const branch = new FetchIt('/v2/branch')
const branch_update = new FetchIt('/v2/branch/update')


export const Semister = {
    findMany: () => semister.post({}),
    updateById: ({ _id, payload }) => semister.put({ body: { ...payload, _id } }),
    deleteById: ({ _id }) => semister.delete({ body: { _id } }),
}

export const Branch = {
    getMany: () => branch.post({}),
    getById: ({ id }) => branch.get({ params: { _id: id } }),
    putById: ({ id, payload }) => branch.put({ body: { payload, id } }),
    deleteById: ({ id }) => branch.delete({ body: { id } }),
    getByIdWithSemisters: ({ id }) => branch_update.get({ params: { _id: id } })
}

const subject = new FetchIt('/v2/subject')
const subject_search = new FetchIt("/v2/subject/search")

export const Subject = {
    getMany: ({ body }) => subject_search.post({ body }),
    getById: ({ id }) => subject.get({ params: { _id: id } }),
    putById: ({ id, payload }) => subject.put({ body: { payload, id } }),
    deleteById: ({ id }) => subject.delete({ body: { id } }),
}


const teacher = new FetchIt('/v2/teacher')
export const Teacher = {
    getMany: ({ body }) => teacher.post({ body }),
    getById: ({ id }) => teacher.get({ params: { _id: id } }),
    putById: ({ id, payload }) => teacher.put({ body: { payload, id } }),
}


const student = new FetchIt('/v2/student')
const student_details = new FetchIt("/v2/student/details")

const student_marks = new FetchIt("/v2/student/marks")

export const Student = {
    getMany: ({ body }) => student.post({ body }),
    getById: ({ id }) => student.get({ params: { _id: id } }),
    putById: ({ id, payload }) => student.put({ body: { payload, id } }),
    getDetails: ({ user }) => student_details.post({ body: { user } }),
    marks: {
        getMany: ({ user }) => student_marks.post({ body: { user } }),
        putById: ({ payload, id }) => student_marks.put({ body: { payload, id } }),
        patchPublish: ({ user }) => student_marks.patch({ body: { user } }),
        delete: ({ body }) => student_marks.delete({ body }),
    }
}


const attendance = new FetchIt('/v2/attendance')

export const Attendance = {
    getMany: ({ body }) => attendance.post({ body })
}

const notice = new FetchIt('/Notice')
const v2_notice = new FetchIt('/v2/notice')

export const Notice = {
    getMany: ({ body }) => v2_notice.post({ body }),
    deleteById: ({ id }) => notice.delete({ url: notice.url + '/' + id })
}