const normalizeKey = (value) =>
  value?.toString().trim().toLowerCase() ?? "";

export const getOrderStatusKey = (value) => {
  const normalized = normalizeKey(value);
  if (!normalized) return "unknown";
  if (normalized === "in progress" || normalized === "progress") {
    return "progress";
  }
  if (normalized === "completed") return "completed";
  if (normalized === "confirmed") return "confirmed";
  if (normalized === "accepted") return "accepted";
  return normalized;
};

export const getPaymentStatusKey = (value) => {
  const normalized = normalizeKey(value);
  if (!normalized) return "unknown";
  if (normalized === "paid") return "paid";
  if (normalized === "pending") return "pending";
  if (normalized === "unpaid") return "unpaid";
  return normalized;
};

export const getPaymentTypeKey = (value) => {
  const normalized = normalizeKey(value);
  if (!normalized) return "unknown";
  if (normalized === "credit") return "credit";
  if (normalized === "debit") return "debit";
  return normalized;
};
