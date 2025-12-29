import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { toast } from "react-toastify";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../utils/validationSchema";

function CreateItemProduct({ open, onClose, onRefetch }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const today = new Date().toISOString().slice(0, 10);
  const { CreateProduct } = useCreateProduct(API_BASE_URL);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState, reset, control } = useForm({
     resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "active",
      createdAt: today,
    },
  });
  const CATEGORIES = [
    "Phone",
    "Laptop",
    "Accessory",
    "Monitor",
    "Tablet",
    "Headphone",
  ];
  const STATUSES = ["active", "inactive"];
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (!data) {
        toast.error("Create product failed");
        return;
      }

      await CreateProduct(data);
      toast.success("Create product successfully");

      // load lại danh sách
      if (onRefetch) {
        onRefetch();
      }
      reset();
      onClose?.();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const onError = (error) => {
    error;
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        disableRestoreFocus
        onClose={(event, reason) => {
          // Không đóng Dialog khi click ra ngoài
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleClose();
        }}
      >
        {/* Title */}
        <DialogTitle>Add Product Form</DialogTitle>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, onError)} control={control}>
          <DialogContent dividers>
            {/* Name */}
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              defaultValue=""
              {...register("name")}
            />

            {/* Category */}
            <TextField
              select
              label="Category"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
              defaultValue=""
              {...register("category")}
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            {/* Price */}
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              defaultValue=""
              {...register("price")}
            />

            {/* Stock */}
            <TextField
              label="In Stock"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.stock}
              helperText={errors.stock?.message}
              defaultValue=""
              {...register("stock")}
            />

            {/* Status */}
            <TextField
              select
              label="Status"
              fullWidth
              margin="normal"
              defaultValue="active"
              {...register("status")}
            >
              {STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              error={!!errors.createdAt}
              helperText={errors.createdAt?.message}
              {...register("createdAt", {
                required: "Created date is required",
              })}
            />
          </DialogContent>
          {/* Action buttons */}
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateItemProduct;
