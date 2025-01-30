import FetchIt from "./FetchIt"


const subject = new FetchIt('/v2/student-api/subject')
const Subject = {
    getMany: ({ body }) => subject.post({ body })
}


const profile = new FetchIt('/v2/student-api/profile')
const getProfile = () => profile.post()


const attendance = new FetchIt('/v2/student-api/attendance')
const Attendance = {
    getMany: ({ body }) => attendance.post({ body })
}

const results = new FetchIt('/v2/student-api/results')
const Results = {
    getMany: () => results.post(),
    getOne: ({ params }) => results.get({ params }),
    getById: ({ id }) => results.get({ params: { id } })
}

const Student = { Subject, Attendance, Results, getProfile }

export default Student