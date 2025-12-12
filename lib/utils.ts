import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // شهور تبدأ من 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function formatDateForPostgres(date: string | Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // شهور تبدأ من 0
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withLock<T extends (...args: any[]) => Promise<any>>(fn: T) {
  let isRunning = false;

  return async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
    const e = args[0]?.e;
    e?.stopPropagation();
    e?.preventDefault();

    if (isRunning) return;
    isRunning = true;

    try {
      return await fn(...args);
    } finally {
      isRunning = false;
    }
  };
}
