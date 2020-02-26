/**
 * We have 7 days, all days aligned in the center, otherwise
 * we' ll have a problem with the right or left side. So 100 / 7 / 2 = ~7.14
 * With 7.14% padding content began right in the center of 1st day
 * but we need it began lefter & end righter so 6% is really good for calendar horizontal padding.
 */

export const calendarPaddingHorizontal = "6%";
