import readlineSync from "readline-sync";
class CountdownTimer {
  private targetDate: Date;
  private intervalid: NodeJS.Timeout | null;

  constructor(targetDate: Date) {
    this.targetDate = targetDate;
    this.intervalid = null;
  }
  start() {
    this.intervalid = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = this.targetDate.getTime() - currentTime;

      if (timeDifference <= 0) {
        this.stop();
        console.log("Countdown finished!");
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        console.log(
          `countdown: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
      }
    }, 1000);
  }
  stop() {
    if (this.intervalid) {
      clearInterval(this.intervalid);
    }
  }
}
function getUserDataInput(promptMessage: string) {
  const userInput = readlineSync.question(promptMessage);
  const parsedDate = new Date(userInput);
  if (isNaN(parsedDate.getTime())) {
    console.log("Invalid date formet, please enter a valid date.");
    return getUserDataInput(promptMessage);
  }
  return parsedDate;
}
const currentDate = new Date();
const targetDate = getUserDataInput(
  "Enter the target date and time (YYYY-MM-DDTHH:MM:SS: "
);
const timer = new CountdownTimer(targetDate);
timer.start();
