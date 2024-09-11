import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from './Pages/Login.jsx';
import TaskDetails from "./Pages/TaskDetails.jsx";
import Tasks from "./Pages/Tasks.jsx";
import Trash from "./Pages/Trash.jsx";
import Users from "./Pages/Users.jsx";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx";
import { Fragment, useRef } from "react";
import { setOpenSidebar } from "./Redux/slices/authSlice.js";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoMdClose } from 'react-icons/io'; // Importing IoMdClose icon

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSideBar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSideBar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div
          ref={mobileMenuRef}
          className={clsx("md:hidden w-full h-full bg-black/40 transition-all duration-700 transform", isSidebarOpen ? "translate-x-0" : "translate-x-full")}
          onClick={() => closeSidebar()}
        >
          <div className="bg-white w-3/4 h-full">
            <div className="w-full flex justify-end px-5 mt-5">
              <button
                onClick={() => closeSidebar()}
                className="flex justify-end items-end"
              >
                <IoMdClose size={25} />
              </button>
            </div>
            <div className="-mt-10">
              <Sidebar />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/Tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/Team' element={<Users />} />
          <Route path='/Trashed' element={<Trash />} />
          <Route path='/Task/:id' element={<TaskDetails />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
