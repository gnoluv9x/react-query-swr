import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, getListUsers, postUsers } from "./api";
import { Loading } from "./loading";

function ListUsers({ count }) {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    name: null,
    age: null,
  });

  const { data: listUsers, isLoading: isGetListUsers } = useQuery("Users", getListUsers, {
    refetchOnWindowFocus: false,
  });
  const { mutate, isLoading, isError, error } = useMutation(postUsers, {
    onSuccess: () => queryClient.refetchQueries({ queryKey: "Users" }),
  });
  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => queryClient.refetchQueries({ queryKey: "Users" }),
  });

  const handleEdit = () => {};
  const handleDelete = id => {
    deleteMutation.mutate(id);
  };
  const handlePost = () => {
    mutate({
      name: formValues.name,
      age: formValues.age,
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFormValues(prevForm => ({ ...prevForm, [name]: value }));
  };

  return (
    <div>
      <input name="name" onChange={handleChange} placeholder="Nhap ten" />
      <input name="age" onChange={handleChange} type="number" placeholder="Nhap tuoi" />
      <button onClick={handlePost}>Post</button>
      <div>Count now is: {count}</div>
      {!isGetListUsers ? (
        <ul>
          {listUsers?.map((user, index) => (
            <li key={user._id} style={{ padding: "12px", borderBottom: "1px solid #aaa" }}>
              <span style={{ marginRight: "12px" }}>{index + 1}</span>
              <span style={{ marginRight: "12px" }}>
                {user.name} has age: {user.age}
              </span>
              <button style={{ marginRight: "12px" }} onClick={handleEdit}>
                Edit
              </button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ListUsers;
