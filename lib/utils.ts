import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${month}/${day}/${year}`;
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
