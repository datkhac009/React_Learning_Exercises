import {
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
  Typography,
  Box,
  Accordion,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterBar({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = 0;
  const maxPrice = 100000000;
  // filter category, status
  const categoryUrl = searchParams.get("category") || "";
  const statusUrl = searchParams.get("status") || "";

  //price range
  const priceMinUrl = Number(searchParams.get("priceMin")) || 0;
  const priceMaxUrl = Number(searchParams.get("priceMax")) || 0;
  // date
  const createdAtUrl = searchParams.get("createdAt") || "";

  //state
  const [category, setCategory] = useState(categoryUrl);
  const [status, setStatus] = useState(statusUrl);
  const [priceRange, setPriceRange] = useState([
    priceMinUrl || 0,
    priceMaxUrl || 1000000,
  ]);
  const [createAt, setCreateAt] = useState(createdAtUrl);

  // Khi back/forward hoặc reload đổi URL -> sync lại state
  useEffect(() => {
    setCategory(categoryUrl);
  }, [categoryUrl]);
  useEffect(() => {
    setStatus(statusUrl);
  }, [statusUrl]);
  useEffect(() => {
    setPriceRange([priceMinUrl || minPrice, priceMaxUrl || maxPrice]);
  }, [priceMinUrl, priceMaxUrl]);
  useEffect(() => {
    setCreateAt((prev) => (prev === createdAtUrl ? prev : createdAtUrl));
  }, [createdAtUrl]);

  const categories = useMemo(() => {
    return [...new Set(product.map((p) => p.category).filter(Boolean))];
  }, [product]);

  // update URL
  const updateParams = (fn) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      fn(p);
      p.set("page","1"); // đổi filter -> về trang 1
      return p;
    });
  };

  const handleCategory = (value) => {
    setCategory(value);
    updateParams((params) => {
      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
    });
  };
  const handleStatus = (value) => {
    setStatus(value);
    updateParams((params) => {
      if (value) params.set("status", value);
      else params.delete("status");
    });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const handlePriceCommit = (value) => {
    updateParams((params) => {
      params.set("priceMin", String(value[0]));
      params.set("priceMax", String(value[1]));
    });
  };

  const handleCreatedAt = (value) => {
    setCreateAt(value);
    updateParams((params) => {
      if (value) params.set("createdAt", value);
      else params.delete("createdAt");
    });
  };

  //Reset Filter
  const handleReset = () => {
    setCategory("");
    setStatus("");
    setPriceRange([minPrice, maxPrice]);
    setCreateAt("");

    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.delete("category");
        p.delete("status");
        p.delete("priceMin");
        p.delete("priceMax");
        p.delete("createdAt");
        p.set("page", "1");
        return p;
      },
      { replace: true }
    );
  };

return (
  <Accordion
    defaultExpanded
    disableGutters
    elevation={0}
    sx={{ "&:before": { display: "none" }, mb: 1.5  }}
  >
    <Paper elevation={1} sx={{ p: 1.5, borderRadius: 1.5 }}>
      <Stack spacing={1.25}>
        {/* Category + Status */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <FormControl size="small" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => handleCategory(e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => handleStatus(e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Price + Date + Reset  */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.25}
          alignItems={{ md: "center" }}
        >
          {/* Price */}
          <Box
            sx={{
              flex: 2,
              px: 1,
              py: 0.75,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              minWidth: 0,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Price: {priceRange[0].toLocaleString()} –{" "}
              {priceRange[1].toLocaleString()} VND
            </Typography>

            <Slider
              size="small"
              value={priceRange}
              onChange={(_, v) => handlePriceChange(v)}
              onChangeCommitted={(_, v) => handlePriceCommit(v)}
              min={minPrice}
              max={maxPrice}
              step={100000}
            />
          </Box>

          {/* Date */}
          <TextField
            size="small"
            type="date"
            label="Created At"
            value={createAt}
            onChange={(e) => handleCreatedAt(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: { md: 220 } }}
            fullWidth
          />

          {/* Reset (nút nhỏ như hình, không full width) */}
          <Button
            size="small"
            variant="outlined"
            onClick={handleReset}
            sx={{
              textTransform: "none",
              borderRadius: 1,
              whiteSpace: "nowrap",
              alignSelf: { xs: "flex-start", md: "center" },
              width: { xs: "auto", md: "auto" },
              minWidth: 88,
              height: 40,
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Paper>
  </Accordion>
);


}

export default FilterBar;
