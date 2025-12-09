import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Form, useForm } from "react-hook-form";

function CreateItemProduct({ open, onClose, onSuccess }) {
  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "active",
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
  const handleClose = () => {
    reset();
    onClose?.();
  };
  const onSubmit = () => {
    console.log("succes");
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
        onClose={(event, reason) => {
          // Không cho đóng khi click ra ngoài 
          if (reason === "backdropClick") return;
          handleClose();
        }}
      >
        {/* Title */}
        <DialogTitle>Add Product Form</DialogTitle>

        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmit, onError)} control={control}>
          <DialogContent dividers>
            {/* Name */}
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
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
              defaultValue=""
              error={!!errors.category}
              helperText={errors.category?.message}
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
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
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
          </DialogContent>
          {/* Action buttons */}
          <DialogActions>
            <Button onClick={handleClose} >Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}

export default CreateItemProduct;
