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
  TableSortLabel,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { formatDate } from "../../utils/date";
import { useDelete } from "../../hooks/useDelete";
import { toast } from "react-toastify";
import EditItemProduct from "./EditItemProduct";
import { formatVND } from "../../utils/priceVnd";

function ProductTable({
  toggleSort,
  products,
  loading,
  onRefetch,
  currentPage = 1,
  itemsPerPage = 8,
  sortField,
  sortDir = "asc",
}) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { DeleteProduct, isDeleteting } = useDelete(API_BASE_URL);

  // Đảm bảo không bao giờ undefined
  const safeDir = sortDir === "asc" || sortDir === "desc" ? sortDir : "asc";

  // State cho dialog Delete
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State cho dialog edit
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) return <Spinner rows={products.length} />;

  // Hàm mở dialog
  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  // Hàm đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Hàm xác nhận xóa
  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await DeleteProduct(selectedProduct.id);
      toast.success("Deleted successfully");

      if (onRefetch) {
        onRefetch();
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Delete failed product");
    }
  };

  // Truyền dữ liệu product xuống editProduct và mở dialog form edit
  const handleEditDialog = (p) => {
    setEditingProduct(p);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingProduct(null);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: 600,
                },
                "& .MuiTableSortLabel-root:hover": {
                  color: "white",
                },
                "& .MuiTableSortLabel-root": {
                  color: "white",
                },
                "& .MuiTableSortLabel-icon": {
                  color: "white !important",
                  fontWeight: 600,
                },
              }}
            >
              <TableCell>#</TableCell>

              {/* NAME COLUMN */}
              <TableCell sortDirection={sortField === "name" ? safeDir : false}>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortField === "name" ? safeDir : "asc"}
                  onClick={() => toggleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>

              {/* CATEGORY  */}
              <TableCell>Category</TableCell>

              {/*  PRICE COLUMN */}
              <TableCell
                sortDirection={sortField === "price" ? safeDir : false}
              >
                <TableSortLabel
                  active={sortField === "price"}
                  direction={sortField === "price" ? safeDir : "asc"}
                  onClick={() => toggleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>

              {/*  STOCK COLUMN */}
              <TableCell
                sortDirection={sortField === "stock" ? safeDir : false}
              >
                <TableSortLabel
                  active={sortField === "stock"}
                  direction={sortField === "stock" ? safeDir : "asc"}
                  onClick={() => toggleSort("stock")}
                >
                  In Stock
                </TableSortLabel>
              </TableCell>

              {/* STATUS -  */}
              <TableCell>Status</TableCell>

              {/*  CREATED  */}
              <TableCell
                sortDirection={sortField === "createdAt" ? safeDir : false}
              >
                <TableSortLabel
                  active={sortField === "createdAt"}
                  direction={sortField === "createdAt" ? safeDir : "asc"}
                  onClick={() => toggleSort("createdAt")}
                >
                  Created At
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p, index) => {
              const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
              return (
                <TableRow
                  key={p.id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{actualIndex}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{formatVND(p.price)}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>{formatDate(p.createdAt)}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={0.75}
                      sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEditDialog(p)}
                        sx={{
                          textTransform: "none",
                          minWidth: { xs: 76, sm: 64 },
                          px: 1.25,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: 12,
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        disabled={isDeleteting}
                        onClick={() => handleOpenDialog(p)}
                        sx={{
                          textTransform: "none",
                          minWidth: { xs: 76, sm: 64 },
                          px: 1.25,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: 12,
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog confirm Delete */}
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

      <EditItemProduct
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onRefetch={onRefetch}
        product={editingProduct}
      />
    </>
  );
}

export default ProductTable;
