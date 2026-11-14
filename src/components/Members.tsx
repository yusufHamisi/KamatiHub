import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

const defaultMembers: Member[] = [
  {
    id: "1",
    name: "Yusuf Hamisi",
    phone: "0712 345 678",
    email: "yusuf@example.com",
    role: "Administrator",
    status: "Active",
  },
  {
    id: "2",
    name: "Amina Hassan",
    phone: "0755 123 456",
    email: "amina@example.com",
    role: "Chairperson",
    status: "Active",
  },
  {
    id: "3",
    name: "Juma Said",
    phone: "0788 456 789",
    email: "juma@example.com",
    role: "Treasurer",
    status: "Active",
  },
];

function Members() {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem("kamatihub-members");

    if (savedMembers) {
      return JSON.parse(savedMembers);
    }

    return defaultMembers;
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const saveMembers = (updatedMembers: Member[]) => {
    setMembers(updatedMembers);

    localStorage.setItem(
      "kamatihub-members",
      JSON.stringify(updatedMembers)
    );
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setRole("");
    setStatus("Active");
    setEditingMember(null);
    setShowForm(false);
  };

  const handleAddMember = () => {
    if (!name || !phone || !email || !role) {
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      role,
      status,
    };

    saveMembers([...members, newMember]);

    resetForm();
  };

  const handleEditMember = () => {
    if (!editingMember || !name || !phone || !email || !role) {
      return;
    }

    const updatedMembers = members.map((member) =>
      member.id === editingMember.id
        ? {
            ...member,
            name,
            phone,
            email,
            role,
            status,
          }
        : member
    );

    saveMembers(updatedMembers);

    resetForm();
  };

  const handleDeleteMember = () => {
    if (!deletingMember) {
      return;
    }

    const updatedMembers = members.filter(
      (member) => member.id !== deletingMember.id
    );

    saveMembers(updatedMembers);

    setDeletingMember(null);
  };

  const openEditForm = (member: Member) => {
    setEditingMember(member);

    setName(member.name);
    setPhone(member.phone);
    setEmail(member.email);
    setRole(member.role);
    setStatus(member.status);

    setShowForm(true);
  };

  const filteredMembers = members.filter((member) => {
    const searchText = search.toLowerCase();

    return (
      member.name.toLowerCase().includes(searchText) ||
      member.phone.toLowerCase().includes(searchText) ||
      member.email.toLowerCase().includes(searchText) ||
      member.role.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="w-full">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Members
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your committee members.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            text-white
            px-5
            py-2.5
            rounded-lg
            font-semibold
            hover:bg-blue-700
            transition
          "
        >
          <Plus size={20} />
          Add Member
        </button>

      </div>


      {/* Add / Edit Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Form Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingMember ? "Edit Member" : "Add New Member"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingMember
                  ? "Update this member's information."
                  : "Add a new member to your committee."}
              </p>
            </div>

            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close form"
            >
              <X size={22} />
            </button>

          </div>


          {/* Form Fields */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>


            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>


            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>


            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  bg-white
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              >
                <option value="">Select role</option>
                <option value="Administrator">Administrator</option>
                <option value="Chairperson">Chairperson</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Member">Member</option>
              </select>
            </div>


            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Active" | "Inactive")
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  bg-white
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>


          {/* Form Buttons */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200">

            <button
              onClick={resetForm}
              className="
                px-5
                py-2.5
                rounded-lg
                border
                border-gray-300
                text-gray-700
                font-semibold
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </button>

            <button
              onClick={
                editingMember
                  ? handleEditMember
                  : handleAddMember
              }
              className="
                px-5
                py-2.5
                rounded-lg
                bg-blue-600
                text-white
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              {editingMember ? "Save Changes" : "Add Member"}
            </button>

          </div>

        </div>
      )}


      {/* Search */}
      <div className="mb-6">

        <div
          className="
            flex
            items-center
            gap-3
            w-full
            bg-white
            border
            border-gray-200
            rounded-xl
            px-4
            py-3
          "
        >
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="
              bg-transparent
              outline-none
              w-full
              text-sm
              text-gray-700
            "
          />

        </div>

      </div>


      {/* Members Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-lg
                bg-blue-50
                flex
                items-center
                justify-center
              "
            >
              <Users
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Members
              </h2>

              <p className="text-sm text-gray-500">
                {filteredMembers.length} member
                {filteredMembers.length !== 1 ? "s" : ""}
              </p>
            </div>

          </div>

        </div>


        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Member
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredMembers.map((member) => (

                <tr
                  key={member.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* Member */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-blue-100
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <span className="text-blue-600 font-semibold">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {member.name}
                        </p>
                      </div>

                    </div>

                  </td>


                  {/* Contact */}
                  <td className="px-6 py-4">

                    <p className="text-sm text-gray-800">
                      {member.phone}
                    </p>

                    <p className="text-sm text-gray-500">
                      {member.email}
                    </p>

                  </td>


                  {/* Role */}
                  <td className="px-6 py-4">

                    <span className="text-sm text-gray-700">
                      {member.role}
                    </span>

                  </td>


                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          member.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {member.status}
                    </span>

                  </td>


                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end items-center gap-2">

                      <button
                        onClick={() => openEditForm(member)}
                        className="
                          p-2
                          rounded-lg
                          text-gray-500
                          hover:bg-blue-50
                          hover:text-blue-600
                          transition
                        "
                        aria-label="Edit member"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => setDeletingMember(member)}
                        className="
                          p-2
                          rounded-lg
                          text-gray-500
                          hover:bg-red-50
                          hover:text-red-600
                          transition
                        "
                        aria-label="Delete member"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* Mobile List */}
        <div className="md:hidden">

          {filteredMembers.map((member) => (

            <div
              key={member.id}
              className="
                p-5
                border-b
                border-gray-100
                last:border-b-0
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <span className="text-blue-600 font-semibold">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div>

                    <p className="font-semibold text-gray-900">
                      {member.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {member.role}
                    </p>

                  </div>

                </div>

                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      member.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  {member.status}
                </span>

              </div>


              <div className="mt-4 text-sm text-gray-500">

                <p>{member.phone}</p>

                <p>{member.email}</p>

              </div>


              <div className="flex justify-end gap-2 mt-4">

                <button
                  onClick={() => openEditForm(member)}
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-semibold
                    text-blue-600
                    bg-blue-50
                    hover:bg-blue-100
                    transition
                  "
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => setDeletingMember(member)}
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-semibold
                    text-red-600
                    bg-red-50
                    hover:bg-red-100
                    transition
                  "
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="p-10 text-center">

            <Users
              size={40}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              No members found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try a different search or add a new member.
            </p>

          </div>
        )}

      </div>


      {/* Delete Confirmation */}
      {deletingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">

            <div
              className="
                flex
                items-center
                justify-center
                w-12
                h-12
                rounded-full
                bg-red-50
                mb-4
              "
            >
              <Trash2
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Delete Member?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {deletingMember.name}
              </span>
              ? This action cannot be undone.
            </p>


            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setDeletingMember(null)}
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  border
                  border-gray-300
                  text-gray-700
                  font-semibold
                  hover:bg-gray-50
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteMember}
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  bg-red-600
                  text-white
                  font-semibold
                  hover:bg-red-700
                  transition
                "
              >
                Delete Member
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Members;