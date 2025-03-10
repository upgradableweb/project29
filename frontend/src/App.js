import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import ChooseUser from './pages/ChooseUser';
import { ToastContainer } from './components/Toast';
import ResultCheck from './pages/ResultCheck';
import PrintResult from './pages/PrintResult';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import { Token } from './v2/api'
import { authLogout } from './redux/userRelated/userSlice';


const App = () => {

  const [notFound, setNotFound] = useState(false)
  console.log('notFound: ', notFound);

  const { currentRole } = useSelector(state => state.user);

  const { pathname } = window.location
  const isPublic = pathname.startsWith('/results') || pathname.startsWith("/results/print") || pathname.startsWith("/reset-password")

  const dispatch = useDispatch();

  useEffect(() => {

    if (currentRole) {
      Token.verify()
        .catch((err) => {
          if (err.logout) {
            dispatch(authLogout());
            window.location.reload();
          }
        })
    }

  }, [])



  return (
    <div>
      <Router>
        <div hidden={isPublic}>
          {currentRole === "student" ?
            <StudentDashboard />
            : currentRole === "teacher" ?
              <TeacherDashboard />
              : currentRole ?
                <AdminDashboard />
                : <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/choose" element={<ChooseUser visitor="normal" />} />
                  <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />
                  <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
                  <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
                  <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />
                  {!isPublic && <Route path="*" element={<NotFound />} />}
                </Routes>}
        </div>
        <Routes>
          <Route path='/results' element={<ResultCheck />} />
          <Route path='/results/print' element={<PrintResult />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          {!currentRole && isPublic && <Route path='*' element={<NotFound />} />}
        </Routes>
        
        <ToastContainer />

      </Router>
    </div>
  )
}

export default App