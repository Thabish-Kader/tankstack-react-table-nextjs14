"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";

/* The above code is defining a React component called "Table". This component takes in a prop called
"data" which is an array of objects representing people's information. */
export const Table = ({ data }: { data: Person[] }) => {
  const [personData, setPersonData] = useState<Person[]>();
  const [modalInputs, setModalInputs] = useState<TModalInputs>({
    isDeleteBtnClicked: false,
    isEditBtnClicked: false,
    rowData: null,
    rowNumber: null,
    edditedName: "",
    edditedAge: 0,
    edditedCity: "",
    edditedPinCode: "",
  });
  const [searchName, setSearchName] = useState("");
  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.accessor("slNo", {
      id: "slNo",
      header: "Sl No",
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("age", {
      id: "age",
      header: "Age",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("city", {
      id: "city",
      header: "City",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("pinCode", {
      id: "pinCode",
      header: "Pin Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("actions", {
      id: "actions",
      header: "Actions",
      cell: (info: any) => (
        <div className="space-x-4">
          <button
            className="text-blue-500 "
            onClick={() =>
              setModalInputs({
                ...modalInputs,
                isEditBtnClicked: true,
                rowData: info.row.original,
                rowNumber: info.row.index + 1,
              })
            }
          >
            Edit
          </button>

          <button
            className="text-red-500 "
            onClick={() =>
              setModalInputs({
                ...modalInputs,
                isDeleteBtnClicked: true,
                rowData: info.row.original,
                rowNumber: info.row.index + 1,
              })
            }
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const handleEditRow = () => {
    const edditedEntry = {
      name: modalInputs?.edditedName,
      age: modalInputs?.edditedAge,
      city: modalInputs?.edditedCity,
      pinCode: modalInputs?.edditedPinCode,
    };

    const updatedData = personData?.map((personDetails: Person) => {
      if (
        personDetails.name === modalInputs?.rowData?.name &&
        personDetails.pinCode === modalInputs?.rowData?.pinCode &&
        personDetails.city === modalInputs?.rowData?.city &&
        personDetails.age === modalInputs?.rowData?.age
      ) {
        return edditedEntry;
      }
      return personDetails;
    });

    setPersonData(updatedData || []);
    setModalInputs({
      ...modalInputs,
      isEditBtnClicked: false,
      rowData: null,
      rowNumber: null,
      edditedName: "",
      edditedAge: 0,
      edditedCity: "",
      edditedPinCode: "",
    });
  };
  const handleDeleteRow = () => {
    const updatedData = personData?.filter(
      (personDetails: Person) =>
        personDetails.name !== modalInputs?.rowData?.name &&
        personDetails.pinCode !== modalInputs?.rowData?.pinCode &&
        personDetails.city !== modalInputs?.rowData?.city &&
        personDetails.age !== modalInputs?.rowData?.age
    );
    setPersonData(updatedData || []);
    setModalInputs({
      ...modalInputs,
      isDeleteBtnClicked: false,
      isEditBtnClicked: false,
      rowData: null,
      rowNumber: null,
    });
  };

  const table = useReactTable({
    data: personData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchName,
    },
    onGlobalFilterChange: setSearchName,
  });

  const handleCloseModal = () => {
    setModalInputs({
      ...modalInputs,
      isDeleteBtnClicked: false,
      isEditBtnClicked: false,
    });
  };

  useEffect(() => {
    setPersonData(data);
  }, [data]);

  return (
    <div className="max-w-5xl mx-auto w-full relative overflow-x-auto shadow-md sm:rounded-lg">
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search Name..."
        className="bg-gray-50 w-1/3 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white my-4"
      />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-6 py-3" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={modalInputs.isDeleteBtnClicked}
        onClose={handleCloseModal}
        handleBtnOnClick={handleDeleteRow}
        modalTitle={`Delete Row ${
          modalInputs.rowNumber ? modalInputs.rowNumber : ""
        } `}
      >
        <p className="my-2 font-bold text-lg">
          Are you sure you want to delete this row?
        </p>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {modalInputs.rowData?.name}
          </p>
          <p>
            <strong>City:</strong> {modalInputs.rowData?.city}
          </p>
          <p>
            <strong>Pin Code:</strong> {modalInputs.rowData?.pinCode}
          </p>
          <p>
            <strong>Age:</strong> {modalInputs.rowData?.age}
          </p>
        </div>
      </Modal>

      <Modal
        show={modalInputs.isEditBtnClicked}
        onClose={handleCloseModal}
        handleBtnOnClick={handleEditRow}
        modalTitle={`Edit Row ${
          modalInputs.rowNumber ? modalInputs.rowNumber : ""
        } `}
      >
        <div className="flex flex-col   space-y-3">
          <input
            value={modalInputs?.edditedName}
            onChange={(e) =>
              setModalInputs({ ...modalInputs, edditedName: e.target.value })
            }
            type="text"
            placeholder="Edit name"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />

          <input
            value={modalInputs?.edditedAge}
            onChange={(e) =>
              setModalInputs({
                ...modalInputs,
                edditedAge: parseInt(e.target.value),
              })
            }
            type="number"
            placeholder="Edit age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
          <input
            value={modalInputs?.edditedCity}
            onChange={(e) =>
              setModalInputs({ ...modalInputs, edditedCity: e.target.value })
            }
            type="text"
            placeholder="Edit city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
          <input
            value={modalInputs?.edditedPinCode}
            onChange={(e) =>
              setModalInputs({ ...modalInputs, edditedPinCode: e.target.value })
            }
            type="text"
            placeholder="Edit pin code"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </Modal>
    </div>
  );
};
