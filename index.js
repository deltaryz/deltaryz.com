let postsContainer = document.getElementById("posts");
let copyright = document.getElementById("copyright");

copyright.innerHTML = "© 2024 - " + new Date().getFullYear() +
  " Cameron Seid<br/>me @ deltaryz.com";

// TIMEZONE CONVERSION WHEEEEE

// Get the current date and time in UTC
let currentTime = new Date();

// currentTime.setHours(20,0,0,0) // for testing

// we set this to 'true' if it's actively on air
let now = false;

// Find the upcoming Saturday
let dayOfWeek = currentTime.getUTCDay();
let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;  // Calculate days until next Saturday
if (daysUntilSaturday === 0 && currentTime.getUTCHours() >= 1) {
    // If today is Saturday and it's already past 1AM UTC, move to the next Saturday
    daysUntilSaturday = 7;

    // check if it's still going
    if(currentTime.getUTCHours() == 1) now = true;
}
let upcomingSaturday = new Date(currentTime);
upcomingSaturday.setUTCDate(currentTime.getUTCDate() + daysUntilSaturday);

// Set the time to 1:00 AM UTC using setUTCHours
upcomingSaturday.setUTCHours(1, 0, 0, 0);  // 1:00 AM UTC

// Convert to local timezone using toLocaleString with timeZone option
let localTime = new Date(upcomingSaturday.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

// Format the date without the year
let options = { 
    weekday: 'long', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short' 
};
let formatter = new Intl.DateTimeFormat(undefined, options);
let formattedDate = formatter.format(localTime);

document.getElementById("localTime").innerHTML = formattedDate

// Special text if it's happening nowhttps://dj.bronyradio.com/streamhq.mp3
if(now) {
  let text = document.getElementById("localTime");
  text.innerHTML = "!! <a href=\"https://dj.bronyradio.com/streamhq.mp3\">RIGHT NOW</a> !!";
  text.style.padding = "3px 0px 8px 0px";
  text.style.transform = "scale(1.5,1.5)"
}

console.log(formattedDate); // Outputs the date in user's local timezone
