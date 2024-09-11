import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import { tasks } from "../assets/data";
import BoardView from "../Components/BoardView";
import Button from "../Components/Button";
import Loading from "../Components/Loading";
import Tabs from "../Components/Tabs";
import AddTask from "../Components/Task/AddTask";
import Table from "../Components/Task/Table";
import TaskTitle from "../Components/TaskTitle";
import Title from "../Components/Title";
import {useGetAllTaskQuery} from "../Redux/slices/api/taskApiSlice";

const TABS = [
    { title: "Board View", icon: <MdGridView /> },
    { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
};

const Tasks = () => {
    const params = useParams();

    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);

    const status = params?.status || "";

    const{data, isLoading} = useGetAllTaskQuery({
        strQuery: status,
        isTrashed: "",
        search:"",
    });


    return isLoading ? (
        <div className="py-10">
            <Loading />
        </div>
    ) : (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <Title title={status ? `${status} Tasks` : "Tasks"} />

                {!status && (
                    <Button
                        onClick={()=> setOpen(true)}
                        label="Create Task"
                        icon={<IoMdAdd className="text-lg" />}
                        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 px-4"
                    />
                )}
            </div>

            <div>
                <Tabs tabs={TABS} setSelected={setSelected}>
                    <div className="w-full">
                        {!status && (
                            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
                                <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                                <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
                                <TaskTitle label="Completed" className={TASK_TYPE.completed} />
                            </div>
                        )}
                        <BoardView tasks={data?.tasks} />
                    </div>
                    <div className="w-full">
                        <Table tasks={data?.tasks} />
                    </div>
                </Tabs>
                <AddTask open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Tasks;
