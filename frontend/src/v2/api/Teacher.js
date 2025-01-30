import FetchIt from "./FetchIt"


const subject = new FetchIt('/v2/teacher-api/subject')
const Subject = {
    getMany: ({ body }) => subject.post({ body })
}

const attendance = new FetchIt('/v2/teacher-api/attendance')
const Attendance = {
    getMany: ({ semister, branch, ...page }) => attendance.post({ body: { semister, branch, ...page } }),
    putById: ({ payload, id }) => attendance.put({ body: { payload, id } }),
    deleteById: ({  id }) => attendance.delete({ body: { id } })
}

const complain = new FetchIt('/v2/teacher-api/complain')

const Complain = {
    getMany: ({ body }) => complain.post({ body })
}

const profile = new FetchIt('/v2/teacher-api/profile')
const getProfile = ()=> profile.post()

const Teacher = { Subject, Attendance, Complain, getProfile }

export default Teacher