function parseDDMMYYYY(dateStr) {
  // dateStr: "20/12/2025"
  if (!dateStr) return 0;
  const [dd, mm, yyyy] = String(dateStr).split("/");
  if (!dd || !mm || !yyyy) return 0;
  return new Date(+yyyy, +mm - 1, +dd).getTime();
}

export function sortProducts(list, sortField, sortDir) {
  // list: mảng đã filter xong
  if (!sortField || !sortDir) return list;

  const dir = sortDir === "desc" ? -1 : 1;
  const arr = [...list]; // copy để không mutate

  arr.sort((a, b) => {
    // 1) STRING fields
    if (sortField === "name" || sortField === "category" || sortField === "status") {
      const A = String(a[sortField] ?? "").toLowerCase();
      const B = String(b[sortField] ?? "").toLowerCase();
      return A.localeCompare(B) * dir;
    }

    // 2) NUMBER fields
    if (sortField === "price" || sortField === "stock") {
      const A = Number(a[sortField] ?? 0);
      const B = Number(b[sortField] ?? 0);
      return (A - B) * dir;
    }

    // 3) DATE field (dd/mm/yyyy)
    if (sortField === "createdAt") {
      const A = parseDDMMYYYY(a.createdAt);
      const B = parseDDMMYYYY(b.createdAt);
      return (A - B) * dir;
    }

    return 0;
  });

  return arr;
}