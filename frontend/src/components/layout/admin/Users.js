import { MDBDataTable } from "mdbreact";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useEffect } from "react";
import toast from "react-hot-toast"
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../store/api/userApi";

const Users = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsersQuery();
  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation();
  const user = data?.users;
  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }
    if (isSuccess) {
      toast.success("User Deleted Successfully");
      navigate("/admin/users");
    }
  }, [error, isSuccess]);
  const userData = {
    columns: [
      {
        label: "Sl No",
        field: "_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },

      {
        label: "Phone No",
        field: "phone_no",
        sort: "asc",
        width: 150,
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  };

  const deleteHandler = (id) => {
    deleteUser(id)
  };
  user?.forEach((item, index) => {
    userData?.rows.push({
      _id: index + 1,
      name: `${
        item?.name.length >= 20
          ? `${item?.name.substring(0, 20)}...`
          : item?.name
      }`,
      email: item?.email,
      phone_no: item?.phone_no,
      role: item?.role,
      actions: (
        <>
          <button
            onClick={() => navigate(`/admin/user/${item?._id}`)}
            className="btn btn-outline-warning ms-1"
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button onClick={() => deleteHandler(item?._id)} className="btn btn-outline-danger ms-1">
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    });
  });

  return (
    <>
      {isLoading ? (
        <TailSpin
          visible={true}
          height="40"
          width="40"
          color="#0B5ED7"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <AdminLayout>
          <h2 className="text-center pb-3b pt-3">List Of Users</h2>
          <MDBDataTable data={userData} bordered striped />
        </AdminLayout>
      )}
    </>
  );
};

export default Users;
