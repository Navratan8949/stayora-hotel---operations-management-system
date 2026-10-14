"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Sparkles, 
  Check, 
  Clock, 
  User, 
  ShieldCheck, 
  Printer, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  X 
} from "lucide-react";

export default function HousekeepingPage() {
  const {
    currentProperty,
    rooms,
    housekeepingTasks,
    setHousekeepingTasks,
    updateHousekeepingTask,
    toggleTaskChecklist,
    inspectRoom,
    staff,
    setActivePrintDoc,
    addToast
  } = useStayora();

  const [activeTab, setActiveTab] = useState("board");
  const [selectedTask, setSelectedTask] = useState(null);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [inspectRoomNum, setInspectRoomNum] = useState("");
  const [inspectNotes, setInspectNotes] = useState("");
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newRoomNum, setNewRoomNum] = useState("");
  const [newTaskType, setNewTaskType] = useState("Stayover Cleaning");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newAssignedStaff, setNewAssignedStaff] = useState("Sunita Bai");

  // Filter tasks for current property
  const propTasks = housekeepingTasks.filter((t) => t.propertyId === currentProperty.id);

  // Group by status
  const dirtyTasks = propTasks.filter((t) => t.status === "Dirty");
  const inProgressTasks = propTasks.filter((t) => t.status === "In Progress");
  const inspectedTasks = propTasks.filter((t) => t.status === "Inspected");
  const readyTasks = propTasks.filter((t) => t.status === "Ready" || t.status === "Cleaned");

  const hkStaff = staff.filter((s) => s.department === "Housekeeping");

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newRoomNum) return;

    const newTask = {
      id: `hk_${Date.now()}`,
      roomNumber: newRoomNum,
      propertyId: currentProperty.id,
      taskType: newTaskType,
      priority: newPriority,
      assignedTo: newAssignedStaff,
      status: "Dirty",
      dueTime: "Within 2 Hours",
      checklist: [
        { item: "Strip used bed linen & replace with fresh 300TC sheets", completed: false },
        { item: "Sanitize bathroom, mirrors and brass fittings", completed: false },
        { item: "Replenish Kama Ayurveda amenities & towels", completed: false },
        { item: "Mop Kota stone tiles & vacuum rugs", completed: false },
        { item: "Restock minibar & tea bar", completed: false }
      ],
      notes: "Standard operational cleaning schedule."
    };

    setHousekeepingTasks((prev) => [newTask, ...prev]);
    setNewTaskModalOpen(false);
    addToast(`Housekeeping task logged for Room ${newRoomNum}.`, "success");
  };

  const handleInspectionSubmit = (pass) => {
    inspectRoom(inspectRoomNum, currentProperty.id, pass, inspectNotes);
    setInspectModalOpen(false);
    setInspectNotes("");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Facility Cleanliness & Sanitation
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Housekeeping Board & Task Workflows
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Enforce: Dirty &rarr; Assigned &rarr; In Progress &rarr; Cleaned &rarr; Inspected &rarr; Ready.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewTaskModalOpen(true)}
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>New Cleaning Task</span>
            </button>
            <button
              onClick={() => {
                setActivePrintDoc({
                  title: `Daily Housekeeping Task Sheet — ${currentProperty.name}`,
                  docType: "HOUSEKEEPING SHEET",
                  data: {
                    tasks: propTasks
                  },
                  content: (
                    <div className="space-y-4">
                      <table className="w-full text-left text-xs border border-stone-200">
                        <thead className="bg-stone-100">
                          <tr>
                            <th className="p-2">Room</th>
                            <th className="p-2">Task</th>
                            <th className="p-2">Priority</th>
                            <th className="p-2">Assigned Staff</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Sign-off</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {propTasks.map((t) => (
                            <tr key={t.id}>
                              <td className="p-2 font-bold font-mono">Room {t.roomNumber}</td>
                              <td className="p-2">{t.taskType}</td>
                              <td className="p-2">{t.priority}</td>
                              <td className="p-2">{t.assignedTo}</td>
                              <td className="p-2">{t.status}</td>
                              <td className="p-2 border-b border-stone-300">__________</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                });
              }}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
            >
              <Printer className="w-4 h-4 text-[#0d2b24]" />
              <span>Print Task Sheets</span>
            </button>
          </div>
        </div>

        {/* 4 Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1: Dirty / To Clean */}
          <div className="bg-[#faf8f5] p-4 rounded-3xl border border-stone-200 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Dirty / Assigned ({dirtyTasks.length})
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {dirtyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#0d2b24]">
                      Room {task.roomNumber}
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-stone-800">{task.taskType}</p>
                  <div className="flex justify-between items-center text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <span>👤 {task.assignedTo}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateHousekeepingTask(task.id, "In Progress");
                      }}
                      className="text-[10px] font-bold text-blue-700 hover:underline"
                    >
                      Start &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: In Progress */}
          <div className="bg-[#faf8f5] p-4 rounded-3xl border border-stone-200 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                In Progress ({inProgressTasks.length})
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {inProgressTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#0d2b24]">
                      Room {task.roomNumber}
                    </span>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded uppercase">
                      Cleaning
                    </span>
                  </div>
                  <p className="text-xs font-medium text-stone-800">{task.taskType}</p>
                  <div className="flex justify-between items-center text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <span>👤 {task.assignedTo}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateHousekeepingTask(task.id, "Inspected");
                      }}
                      className="text-[10px] font-bold text-emerald-700 hover:underline"
                    >
                      Complete &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Inspected / Ready for Inspection */}
          <div className="bg-[#faf8f5] p-4 rounded-3xl border border-stone-200 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Awaiting Inspection ({inspectedTasks.length})
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {inspectedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#0d2b24]">
                      Room {task.roomNumber}
                    </span>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase">
                      Inspect
                    </span>
                  </div>
                  <p className="text-xs font-medium text-stone-800">{task.taskType}</p>
                  <div className="flex justify-between items-center text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <span>Cleaned by {task.assignedTo}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectRoomNum(task.roomNumber);
                        setInspectModalOpen(true);
                      }}
                      className="text-[10px] font-bold text-[#0d2b24] bg-stone-100 px-2 py-1 rounded hover:bg-stone-200"
                    >
                      Audit &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Ready / Sellable */}
          <div className="bg-[#faf8f5] p-4 rounded-3xl border border-stone-200 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Ready & Sellable ({readyTasks.length})
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {readyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-emerald-950">
                      Room {task.roomNumber}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900">{task.taskType}</p>
                  <div className="text-[10px] text-stone-500 pt-1">
                    Inspected & ready for front desk allocation
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail & Checklist Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-400">Housekeeping Task</span>
                <h3 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  Room {selectedTask.roomNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-stone-400 hover:text-stone-800">
                &times;
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl space-y-1">
              <p><strong>Task Type:</strong> {selectedTask.taskType}</p>
              <p><strong>Current Status:</strong> {selectedTask.status}</p>
              <p><strong>Assigned Attendant:</strong> {selectedTask.assignedTo}</p>
              {selectedTask.notes && <p><strong>Supervisor Notes:</strong> {selectedTask.notes}</p>}
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-800">Sanitation Checklist Items:</h4>
              <div className="space-y-1.5">
                {selectedTask.checklist.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2.5 p-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTaskChecklist(selectedTask.id, idx)}
                      className="w-4 h-4 accent-[#0d2b24] rounded"
                    />
                    <span className={item.completed ? "line-through text-stone-400" : "text-stone-800"}>
                      {item.item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between gap-2">
              <button
                onClick={() => {
                  updateHousekeepingTask(selectedTask.id, "Dirty");
                  setSelectedTask(null);
                }}
                className="px-3 py-2 text-stone-500 hover:text-stone-800 text-[11px]"
              >
                Reset to Dirty
              </button>

              <button
                onClick={() => {
                  updateHousekeepingTask(selectedTask.id, "Ready");
                  setSelectedTask(null);
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider text-[11px]"
              >
                Mark Task Ready
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Inspection Audit Modal */}
      {inspectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Supervisor Room Quality Audit — Room {inspectRoomNum}
            </h3>
            <p className="text-stone-500">
              Inspect bed linen tension, bathroom brass polish, minibar seals, and fragrance quality.
            </p>

            <div>
              <label className="font-medium text-stone-700 block mb-1">Audit Notes / Comments</label>
              <textarea
                rows={3}
                placeholder="Passed inspection or note deficiencies..."
                value={inspectNotes}
                onChange={(e) => setInspectNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              />
            </div>

            <div className="pt-2 flex justify-between gap-2">
              <button
                onClick={() => handleInspectionSubmit(false)}
                className="px-4 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl font-bold"
              >
                Fail Inspection (Mark Dirty)
              </button>
              <button
                onClick={() => handleInspectionSubmit(true)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold"
              >
                Pass Inspection & Mark Ready
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {newTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Assign Housekeeping Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Room Number *</label>
                <select
                  required
                  value={newRoomNum}
                  onChange={(e) => setNewRoomNum(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-bold"
                >
                  <option value="">Select Room...</option>
                  {rooms.filter(r => r.propertyId === currentProperty.id).map(r => (
                    <option key={r.id} value={r.number}>Room {r.number} ({r.housekeepingStatus})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Task Type</label>
                <select
                  value={newTaskType}
                  onChange={(e) => setNewTaskType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Checkout Cleaning">Checkout Cleaning</option>
                  <option value="Stayover Cleaning">Stayover Cleaning</option>
                  <option value="Deep Cleaning & Wood Polish">Deep Cleaning & Polish</option>
                  <option value="Linen & Amenity Refill">Linen & Amenity Refill</option>
                  <option value="Turndown Service">Evening Turndown Service</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="High">High (Arrival Imminent)</option>
                  <option value="Medium">Medium</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Assign Attendant</label>
                <select
                  value={newAssignedStaff}
                  onChange={(e) => setNewAssignedStaff(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  {hkStaff.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewTaskModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
