export function formatDate(deadlineStr) {
  if (!deadlineStr) return "";
  const d = new Date(deadlineStr);
  
  // Format thành yyyy-MM-dd
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  
  return `${dd}/${mm}/${yyyy}`;
}
export function formatDateForInput(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);

    // Kiểm tra date hợp lệ
    if (isNaN(date.getTime())) return "";
    
    // Format thành yyyy-MM-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  } catch (e) {
    console.log(e)
    return "";
  }
}