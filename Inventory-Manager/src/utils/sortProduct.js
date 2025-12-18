//đổi createdAt thành number để đối số so sánh
function parseDate(dateValue) {
  if (!dateValue) return 0;
  return new Date(dateValue).getTime() || 0;
}

export function sortProducts(product, sortField, sortDir) {
  // If no sort criteria, return original product
  if (!sortField || !sortDir) return product;

  const dir = sortDir === "desc" ? -1 : 1;
  const arrProduct = [...product]; // Copy to avoid mutation
  
  arrProduct.sort((a, b) => {
    let A, B;

    // DATE
    if (sortField === "createdAt") {
      A = parseDate(a.createdAt);
      B = parseDate(b.createdAt);
    }
    // Price and stock
    else if (sortField === "price" || sortField === "stock") {
      A = Number(a[sortField] ?? 0);
      B = Number(b[sortField] ?? 0);
    }
    // Name
    else {
      A = String(a[sortField] ?? "").toLowerCase();
      B = String(b[sortField] ?? "").toLowerCase();
      return A.localeCompare(B) * dir;
    }

    return (A - B) * dir;
  });

  return arrProduct;
}
