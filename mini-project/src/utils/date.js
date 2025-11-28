export function formatDate(deadlineStr) {
  if (!deadlineStr) return "";
  const d = new Date(deadlineStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  
  return `${dd}/${mm}/${yyyy}`;
}
export function daysUntil(deadlineStr){
    if(!deadlineStr) return null;

    const today = new Date()
    const deadline = new Date(deadlineStr)

    const getTimeToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
    )
    const getTimeDeadline = new Date(
         deadline.getFullYear(),
        deadline.getMonth(),
        deadline.getDate(),
    )
    const diff = getTimeDeadline.getTime() - getTimeToday.getTime()

     return Math.ceil(diff / (1000 * 60 * 60 * 24));//làm tròn số ngày deadline
}

 export function TimeDeadline(deadline) {
    const day = daysUntil(deadline);
    if (day == null) return formatDate(deadline);
    if(day === 0) return `${formatDate(deadline)} (Due Today)`
    if(day < 0 ) return `${formatDate(deadline)} (Past The Deadline)` 

    return `${formatDate(deadline)} (${day} days left )`
}