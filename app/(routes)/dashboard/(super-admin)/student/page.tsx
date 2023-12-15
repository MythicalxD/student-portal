"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectChangeEvent } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React from "react";

interface Column {
  id: "Sno" | "studentName" | "Result" | "Progress" | "stage";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Sno", label: "S.no", minWidth: 50 },
  { id: "studentName", label: "Student Name", minWidth: 150 },
  { id: "Result", label: "Result", minWidth: 100 },
  { id: "Progress", label: "Progress", minWidth: 100 },
  { id: "stage", label: "Stage", minWidth: 150 },
];

const defaultData = [
  {
    Sno: 1,
    studentName: "John Doe",
    Result: 85,
    Progress: 70,
    stage: "Working",
  },
  {
    Sno: 2,
    studentName: "Jane Smith",
    Result: 92,
    Progress: 88,
    stage: "Unpaid Labour",
  },
  // Add more default data rows here
];

// Sample API call URL
const apiURL = "https://api.example.com/your-endpoint";

// Define an array to store the retrieved data
let rows: any[] = defaultData;

// Function to fetch data from the API and update the 'rows' variable
async function fetchDataFromAPI() {
  try {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      // Update the 'rows' variable with the fetched data
      rows = data;
      console.log(rows);
    } else {
      console.error("API request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
}

// Uncomment the line below to fetch data from the API
// fetchDataFromAPI();

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div>
        <div className="flex mb-4 gap-x-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Course</SelectLabel>
                <SelectItem value="apple">Course 1</SelectItem>
                <SelectItem value="banana">Course 2</SelectItem>
                <SelectItem value="blueberry">Course 3</SelectItem>
                <SelectItem value="grapes">Course 4</SelectItem>
                <SelectItem value="pineapple">Course 5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Year</SelectLabel>
                <SelectItem value="apple">year 1</SelectItem>
                <SelectItem value="banana">year 2</SelectItem>
                <SelectItem value="blueberry">year 3</SelectItem>
                <SelectItem value="grapes">year 4</SelectItem>
                <SelectItem value="pineapple">year 5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button>Search</Button>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" className="w-[80vw]">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.Sno}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </main>
  );
}
