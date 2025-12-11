import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { formatDateForInput } from "../../utils/date";
import { useEditProduct } from "../../hooks/useEditProduct";

function EditItemProduct({ open, onClose, onRefetch, product }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { editProduct, isEditting } = useEditProduct(API_BASE_URL);

  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "active",
      createdAt: "",
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

  // Load data vào form khi product thay đổi
  useEffect(() => {
    if (open && product) {
      reset({ ...product, createdAt: formatDateForInput(product.createdAt) });
    }
  }, [open, product, reset]);

  const onSubmit = async (data) => {
    try {
      if (!data || !product) {
        toast.error("Invalid data");
        return;
      }

      await editProduct(product.id, data);
      toast.success("Product updated successfully");

      if (onRefetch) {
        onRefetch();
      }

      onClose?.();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        handleClose();
      }}
    >
      <DialogTitle>Edit Product Form</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          {/* Name */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            defaultValue=""
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 60, message: "Max 60 characters" },
            })}
          />

          {/* Category */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Category"
                fullWidth
                margin="normal"
                error={!!errors.category}
                helperText={errors.category?.message}
                defaultValue=""
                {...register("category", {
                  required: "Category is required",
                })}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Price */}
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.price}
            helperText={errors.price?.message}
            defaultValue=""
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be > 0" },
            })}
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
            {...register("stock", {
              required: "Stock is required",
              valueAsNumber: true,
              min: { value: 0, message: "Stock must be ≥ 0" },
            })}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
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
            )}
          />

          {/* Created Date */}
          <TextField
            label="Created Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.createdAt}
            helperText={errors.createdAt?.message}
            defaultValue=""
            {...register("createdAt", {
              required: "Created date is required",
            })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isEditting}>
            {isEditting ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditItemProduct;
