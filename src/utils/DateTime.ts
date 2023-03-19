import moment, { Moment } from 'moment-timezone';

type Timezone = 'Asia/Shanghai' | 'Asia/Seoul' | 'Asia/Singapore' | 'Europe/London';

class DateTime {
  private utc: Moment;

  /**
   * Factory method for creating a new DateTime obj from a JS Date Obj.
   * @param date  Date object for DateTime.
   * @returns  new DateTime object.
   */
  public static newDateTimeFromDate(date: Date): DateTime {
    const utc = date.toISOString();
    return new DateTime(utc);
  }

  /**
   * Factory method for creating a new DateTime obj from a UTC string.
   * @param utc  utc string for DateTime.
   * @returns  new DateTime object.
   */
  public static newDateTimeFromUTCString(utc: string): DateTime {
    return new DateTime(utc);
  }

  /**
   * Private Constructor method that creates a new DateTime object.
   * @param utc  utc string from DateTime.
   */
  private constructor(utc: string) {
    DateTime.validateUTCString(utc);
    this.utc = moment.utc(utc);
  }

  /**
   * Converts the current date to the specifed timezone.
   * @param timezone  the timezone to convert to.
   * @returns  a moment object converted to the current timezone.
   */
  public toTimezoneDate(timezone: Timezone): Moment {
    return this.utc.tz(timezone);
  }

  /**
   * Converts the current date into UTC.
   * @returns  a moment object converted to UTC.
   */
  public toUTCDate(): Moment {
    return this.utc;
  }

  /**
   * Converts the current date into UTC String.
   * @returns  a UTC string of the current DateTime Object.
   */
  public toString(): string {
    return `${this.utc.format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
  }

  /**
   * Method used to validate the input string to ensure that it's UTC formatted.
   * @param utc  a string that'll be validated to see if it's UTC.
   * @throws  Error if string is not formatted as UTC.
   */
  public static validateUTCString(utc: string): void {
    const regex = new RegExp('\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z');
    if (!regex.test(utc)) {
      throw new Error('utc string is not in ISO 8601 UTC format');
    }
  }
}

export default DateTime;
