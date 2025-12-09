import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Spinner from "../../components/Spinner";
import { formatDate } from "../../utils/date";

function ProductTable({ products, loading }) {
    console.log(loading)
  if (loading) return <Spinner rows={products.length}/>

  return (
    <TableContainer sx={{ maxHeight: 400 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>In Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p, index) => (
            <TableRow
              key={p.id}
              hover
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>{formatDate(p.createdAt)}</TableCell>
              <TableCell align="right">
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
