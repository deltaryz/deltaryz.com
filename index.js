let postsContainer = document.getElementById("posts");
let copyright = document.getElementById("copyright");

copyright.innerHTML = "© 2024 - " + new Date().getFullYear() +
  " Cameron Seid<br/>me @ deltaryz.com";

// TIMEZONE CONVERSION WHEEEEE

// Get the current date and time in UTC
let now = new Date();
let nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

// Find the upcoming Saturday
let dayOfWeek = nowUtc.getUTCDay();
let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;  // Calculate days until next Saturday
if (daysUntilSaturday === 0 && nowUtc.getUTCHours() >= 1) {
    // If today is Saturday and it's already past 1AM UTC, move to the next Saturday
    daysUntilSaturday = 7;
}
let upcomingSaturday = new Date(nowUtc);
upcomingSaturday.setUTCDate(nowUtc.getUTCDate() + daysUntilSaturday);

// Set the time to 1:00 AM UTC
upcomingSaturday.setUTCHours(1, 0, 0, 0);  // 1:00 AM UTC

// Convert to local timezone
let localTime = new Date(upcomingSaturday.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

// Format the date
let options = { 
    weekday: 'long', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short' 
};
let formatter = new Intl.DateTimeFormat(undefined, options);
let formattedDate = formatter.format(localTime);

document.getElementById("localTime").innerHTML = formattedDate

console.log(formattedDate); // Outputs the date in user's local timezone
