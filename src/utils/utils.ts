

export function formatTimeDifference(timestamp1: number, timestamp2: number): string {
    const timeDifference = Math.abs(timestamp2 - timestamp1) // Convert to seconds

    const days = Math.floor(timeDifference / (24 * 60 * 60));
    const hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeDifference % (60 * 60)) / 60);

    let result = '';
    if (days > 0) {
        result += `${days}天`;
    }
    if (hours > 0) {
        result += `${hours}小时`;
    }
    if (minutes > 0 && days <=0) {
        result += `${minutes}分钟`;
    }

    return result;
}

export function getNextMondayTimestamp() {
    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const daysUntilNextMonday = (currentDayOfWeek === 0 ? 1 : 8) - currentDayOfWeek;

    const nextMonday = new Date(now.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000);
    nextMonday.setHours(4, 0, 0, 0); // Set time to 4 AM

    return Math.floor(nextMonday.getTime() / 1000); // Convert to seconds
}

export function getCurrentTS() {
    return Math.floor(Date.now() / 1000);
}
export function getNextDay4AMTimestamp() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(4, 0, 0, 0); // Set time to 4 AM

    return Math.floor(tomorrow.getTime() / 1000); // Convert to seconds
}
