/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/date.ts
function getDateFormatString(format, customFormat) {
  switch (format) {
    case "ISO8601" /* ISO8601 */:
      return "YYYY-MM-DDTHH:mm:ss.SSSZ";
    case "RFC3339" /* RFC3339 */:
      return "YYYY-MM-DDTHH:mm:ssZ";
    case "RFC2822" /* RFC2822 */:
      return "ddd, DD MMM YYYY HH:mm:ss ZZ";
    case "UNIX" /* UNIX */:
      return "X";
    case "YYYY-MM-DD" /* YYYY_MM_DD */:
      return "YYYY-MM-DD";
    case "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */:
      return "YYYY-MM-DD HH:mm:ss";
    case "DD/MM/YYYY" /* DD_MM_YYYY */:
      return "DD/MM/YYYY";
    case "MM/DD/YYYY" /* MM_DD_YYYY */:
      return "MM/DD/YYYY";
    case "HH:mm:ss" /* HH_MM_SS */:
      return "HH:mm:ss";
    case "custom" /* CUSTOM */:
      return customFormat || "YYYY-MM-DD HH:mm:ss";
    default:
      return "YYYY-MM-DD HH:mm:ss";
  }
}
function formatDate(date, format, customFormat) {
  const formatString = getDateFormatString(format, customFormat);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  if (format === "UNIX" /* UNIX */) {
    return Math.floor(date.getTime() / 1e3).toString();
  }
  return formatString.replace("YYYY", String(year)).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds).replace("SSS", milliseconds);
}

export { formatDate, getDateFormatString };
//# sourceMappingURL=date.mjs.map
//# sourceMappingURL=date.mjs.map