export const getStatusClass = (status) => {
  if (!status) return "default";

  const FormatStyleStatus = status;

  if (FormatStyleStatus === "Haven't started yet") return "pending";
  if (FormatStyleStatus === "Working") return "in-progress";
  if (FormatStyleStatus === "Complete") return "completed";

  return "default";
};