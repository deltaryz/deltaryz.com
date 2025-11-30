let postsContainer = document.getElementById("posts");
let copyright = document.getElementById("copyright");
let scheduledTimeDisplay = document.getElementById('deltamix-time-display');

copyright.innerHTML = "© 2024 - " + new Date().getFullYear() +
  " Cameron Seid<br/>me @ deltaryz.com";

// ===== CONFIGURATION =====
const TARGET_DAY_UTC = 1;     // 0 = Sunday, 1 = Monday, ... 6 = Saturday
const TARGET_HOUR_UTC = 5;    // 05:00 UTC
// ==========================

// Current time
let now = false;
const currentTime = new Date();

// Day-of-week math
const dayOfWeek = currentTime.getUTCDay();
let daysUntil = (TARGET_DAY_UTC - dayOfWeek + 7) % 7;

// If today *is* target day, check whether target hour already passed
if (daysUntil === 0) {
  const currentHour = currentTime.getUTCHours();
  if (currentHour > TARGET_HOUR_UTC) {
    daysUntil = 7;  // next week
  } else if (currentHour === TARGET_HOUR_UTC) {
    now = true;     // currently happening
  }
}

// Build the target UTC datetime
const targetDate = new Date(currentTime);
targetDate.setUTCDate(currentTime.getUTCDate() + daysUntil);
targetDate.setUTCHours(TARGET_HOUR_UTC, 0, 0, 0);

// Convert to local timezone
const localTime = new Date(
  targetDate.toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
);

// Format output
const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};
const formatter = new Intl.DateTimeFormat(undefined, options);
const formatted = formatter.format(localTime);

// Write to page
const el = document.getElementById("localTime");
if (now) {
  el.innerHTML = '!! <a href="https://dj.bronyradio.com/streamhq.mp3">RIGHT NOW</a> !!';
  el.style.padding = "3px 0px 8px 0px";
  el.style.transform = "scale(1.5,1.5)";
} else {
  el.innerHTML = formatted;
}

console.log(formatted);

// Build "DAY HOUR–HOUR UTC" display
const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const startHour = TARGET_HOUR_UTC;
const endHour = (TARGET_HOUR_UTC + 1) % 24;

// Format UTC hour → AM/PM without minutes
function fmt(h) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${suffix}`;
}

const displayString = `${dayNames[TARGET_DAY_UTC]} ${fmt(startHour)}-${fmt(endHour)} UTC`;

// Apply to HTML
scheduledTimeDisplay.textContent = displayString;
