import { Container, Paper, Typography } from "@mui/material";
import { useProduct } from "../../hooks/useProduct";
import ProductTable from "./ProductTable";

function ListProduct() {
  const API_BASE_URL = "http://localhost:2002/";
  const { product, isLoading } = useProduct(API_BASE_URL);

  console.log(product);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Inventory Manager
      </Typography>

      <Paper elevation={1}>
        <ProductTable products={product} loading={isLoading} />
      </Paper>
    </Container>
  );
}

export default ListProduct;
