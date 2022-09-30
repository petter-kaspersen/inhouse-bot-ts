const IS_DEBUG = !!process.env.DEBUG;

console.log(IS_DEBUG);

export class Logger {
  static Debug(...data: unknown[]) {
    if (!IS_DEBUG) return;

    console.info(...data);
  }
}
