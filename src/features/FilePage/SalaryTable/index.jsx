import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";

const columns = [
  { id: "fullname", label: "Fullname", minWidth: 170 },
  {
    id: "knowledge",
    label: "Knowledge",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "technical",
    label: "Technical",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "logical",
    label: "Logical",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "year_experience",
    label: "Year experience",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "salary",
    label: "Salary",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(props) {
  const { fullname, knowledge, technical, logical, year_experience, salary } =
    props;
  console.log(props);
  return { fullname, knowledge, technical, logical, year_experience, salary };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0.5em",
    width: "100%",
    height: "440px",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  table: {
    position: "relative",
    // width: "100%",
    // height: "100%",
  },
  tbbody: {
    // overflow: "hidden",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  boxsekeleton: {
    display: "flex",
    padding: "0 0.5em",
    marginBottom: "50px",
  },
  sekeleton: {
    position: "absolute",
    height: "53px",
    width: "98%",
  },
}));

function SalaryTable({ data, isLoading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const rows = [...data.map((item) => createData(item))];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {isLoading ||
        (data.length > 0 && (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table
                stickyHeader
                aria-label="sticky table"
                className={classes.table}
              >
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
                {isLoading &&
                  [1, 2, 3, 4, 5, 6, 7].map((item, idx) => (
                    <div className={classes.boxsekeleton} key={idx}>
                      <Skeleton
                        animation="pulse"
                        className={classes.sekeleton}
                      />
                    </div>
                  ))}
                {!isLoading && (
                  <TableBody className={classes.tbbody}>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.fullname}
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
                )}
              </Table>
            </TableContainer>
            {!isLoading && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        ))}
    </>
  );
}

export default SalaryTable;
