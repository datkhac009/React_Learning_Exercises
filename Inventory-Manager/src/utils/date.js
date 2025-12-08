export function formatDate(deadlineStr) {
  if (!deadlineStr) return "";
  const d = new Date(deadlineStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  
  return `${dd}/${mm}/${yyyy}`;
}