const IS_DEBUG = !!process.env.DEBUG;

console.log(IS_DEBUG);

export class Logger {
  static Debug(...data: unknown[]) {
    if (!IS_DEBUG) return;

    console.info(...data);
  }

  static Info(...data: unknown[]) {
    console.info(`[INFO] - `, ...data);
  }

  static Error(...data: unknown[]) {
    console.error(`[ERROR] - `, ...data);
  }
}
