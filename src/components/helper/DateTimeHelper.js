class DateTimeHelper {
  static toStringForNyukNyuk(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let hourFormat = ("0" + hour).slice(-2);
    let minFormat = ("0" + min).slice(-2);

    return `${year}. ${month}. ${day}. ${hourFormat}:${minFormat}`;
  }
}

export default DateTimeHelper;