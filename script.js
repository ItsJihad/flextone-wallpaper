// --------------------------------------------------------------------CLOCK-Collected-------------------------------------------------------------------
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalTime = document.getElementById('digital-time');
const toggleFormat = document.getElementById('toggle-format');
const timezoneSelect = document.getElementById('timezone-select');
let is24HourFormat = false;
let selectedTimezone = 'local';

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Adjust time based on selected timezone
    if (selectedTimezone !== 'local') {
        const offset = getTimezoneOffset(selectedTimezone);
        hours += offset;
    }

    // Ensure hours wrap around correctly
    if (hours < 0) {
        hours += 24;
    } else if (hours >= 24) {
        hours -= 24;
    }

    const hourDegrees = (hours % 12 + minutes / 60) * 30;
    const minuteDegrees = (minutes + seconds / 60) * 6;
    const secondDegrees = seconds * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;

    // Update digital time
    let timeString = is24HourFormat ? 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` :
        `${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    digitalTime.textContent = timeString;
}

function getTimezoneOffset(timezone) {
    switch (timezone) {
        case 'UTC': return 0;
        case 'EST': return -5;
        case 'PST': return -8;
        default: return 0;
    }
}

toggleFormat.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateClock();
});

timezoneSelect.addEventListener('change', (e) => {
    selectedTimezone = e.target.value;
    updateClock();
});

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately
// --------------------------------------------------------------------CLOCK-Ended-------------------------------------------------------------------