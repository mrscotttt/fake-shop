export const formatBaht = (num?: number) => {
  if (!num || num < 0) return "฿0.00";
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
  }).format(num);
};
