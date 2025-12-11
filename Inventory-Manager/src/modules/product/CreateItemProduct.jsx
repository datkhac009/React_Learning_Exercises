import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { toast } from "react-toastify";

function CreateItemProduct({ open, onClose, onRefetch  }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const today = new Date().toISOString().slice(0, 10);
  const { CreateProduct } = useCreateProduct(API_BASE_URL);
  const { register, handleSubmit, formState, reset, control } = useForm({
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
          // Không cho đóng khi click ra ngoài
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
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 60, message: "Max 60 characters" },
              })}
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateItemProduct;
