import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { useProduct } from "../../hooks/useProduct";
import ProductTable from "./ProductTable";
import { useState } from "react";
import CreateItemProduct from "./CreateItemProduct";
import { useCreateProduct } from "../../hooks/useCreateProduct";
function ListProduct() {
  const API_BASE_URL = "http://localhost:2002/";
  const { product, isLoading } = useProduct(API_BASE_URL);
  const [openCreate, setOpenCreate] = useState(false);
  const {CreateProduct} = useCreateProduct()
  const handleOpen = () => setOpenCreate(true);
  const handleClose = () => setOpenCreate(false);
  const handleCreateSuccess = (newProduct) => {
    //Snackbar succses
    console.log("FROM DIALOG:", CreateProduct(newProduct));
  };

  console.log(product);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Inventory Manager
        </Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              backgroundColor: "#1565c0",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      <Paper elevation={1}>
        <ProductTable products={product} loading={isLoading} />
      </Paper>
      <CreateItemProduct
        open={openCreate}
        onClose={handleClose}
        onSuccess={handleCreateSuccess}
      />
    </Container>
  );
}

export default ListProduct;
