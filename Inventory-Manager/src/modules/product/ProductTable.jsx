import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { formatDate } from "../../utils/date";
import { useDelete } from "../../hooks/useDelete";
import { toast } from "react-toastify";

function ProductTable({ products, loading, onRefetch }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { DeleteProduct, isDeleteting } = useDelete(API_BASE_URL);

  // ✅ State cho dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading) return <Spinner rows={products.length} />;

  // ✅ Hàm mở dialog
  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  // ✅ Hàm đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // ✅ Hàm xác nhận xóa
  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await DeleteProduct(selectedProduct.id);
      toast.success("Đã xóa thành công");

      if (onRefetch) {
        onRefetch();
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Xóa sản phẩm thất bại");
    }
  };

  return (
    <>
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
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={isDeleteting}
                    onClick={() => handleOpenDialog(p)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog confirm */}
      <Dialog
        open={openDialog}
        disableRestoreFocus
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleCloseDialog();
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>"{selectedProduct?.name}"</strong>?
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isDeleteting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isDeleteting}
          >
            {isDeleteting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductTable;
