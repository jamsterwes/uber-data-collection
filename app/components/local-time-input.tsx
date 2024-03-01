"use client";

import moment from "moment-timezone";
import { useState } from "react";

function getNow(tz: string): string {
  return moment.tz(new Date(), tz).format("yyyy-MM-DDTHH:mm") || '';
}

export const LocalTimeInput = ({name, className, tz, autofill}: {name?: string, className?: string, tz: string, autofill?: boolean}) => {
    const [time, setTime] = useState<string>(autofill ? getNow(tz) : "");

    return <input name={name} type="datetime-local" className={className} value={time} onChange={e => setTime(e.target.value)} />;
}