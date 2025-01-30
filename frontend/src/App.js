import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import { ToastContainer } from './components/Toast';
import { ParellelProccess } from './v2/DemoData';
import ResultCheck from './pages/ResultCheck';
import PrintResult from './pages/PrintResult';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  const { pathname } = window.location
  const isPublic = pathname.startsWith('/results') || pathname.startsWith("/not-found") || pathname.startsWith("/reset-password")


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/results' element={<ResultCheck />} />
          <Route path='/results/print' element={<PrintResult />} />
          {currentRole && <Route path='/reset-password' element={<ResetPassword />} />}
          <Route path='/404' element={<NotFound />} />
        </Routes>
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

                  <Route path="/*" element={<Navigate to={'/'} />} />
                </Routes>}
        </div>

        <ParellelProccess />
        <ToastContainer />

      </Router>
    </div>
  )
}

export default App