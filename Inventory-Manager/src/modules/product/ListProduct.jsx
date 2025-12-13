import { Container, Paper, Typography, Button, Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProduct } from "../../hooks/useProduct";
import ProductTable from "./ProductTable";
import { useEffect, useState } from "react";
import CreateItemProduct from "./CreateItemProduct";
import useSearchInventory from "../../hooks/useSearchInventory";
function ListProduct() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { product, isLoading, refetchdata } = useProduct(API_BASE_URL);
  const { searchIventory, searchResults, isSearch } = useSearchInventory(API_BASE_URL);
  const [searchQuery, setSearchQuery] = useState("");

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpen = () => setOpenCreate(true);
  const handleClose = () => setOpenCreate(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        console.log(searchQuery)
        searchIventory(searchQuery);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchIventory]);
  const displayProducts = searchQuery.trim() ? searchResults : product;
  const displayLoading = searchQuery.trim() ? isSearch : isLoading;

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
      {/* ✅ Search Box */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        {searchQuery && (
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Total: {displayProducts.length}
          </Typography>
        )}
      </Box>

      <Paper elevation={1}>
        <ProductTable
          products={displayProducts}
          loading={displayLoading}
          onRefetch={refetchdata}
        />
      </Paper>
      {/* DialogForm Edit */}
      <CreateItemProduct
        open={openCreate}
        onClose={handleClose}
        onRefetch={refetchdata}
      />
    </Container>
  );
}

export default ListProduct;
