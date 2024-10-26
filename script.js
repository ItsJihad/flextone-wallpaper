

const hourHand = document.getElementById('hour-id');
const minuteHand = document.getElementById('minute-id');
const secondHand = document.getElementById('second-id');
const timeText = document.getElementById('time-text'); 
const dateText = document.getElementById('date-text'); 

function updateClock() {
  const now = new Date();

  
  const secondsFraction = now.getSeconds() / 60;
  const minutesFraction = (secondsFraction + now.getMinutes()) / 60;
  const hoursFraction = (minutesFraction + now.getHours() % 12) / 12;

  
  setRotation(hourHand, hoursFraction);
  setRotation(minuteHand, minutesFraction);
  setRotation(secondHand, secondsFraction);

  
  updateTimeText(now);
 
  updateDateText(now);
}

function setRotation(element, rotationFraction) {
  
  element.style.transform = `rotate(${rotationFraction * 360}deg)`; 
}

function updateTimeText(date) {
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  
  timeText.textContent = `${hours}:${minutes}`;
}

function updateDateText(date) {
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options); 
  
  dateText.textContent = formattedDate;
}


setInterval(updateClock, 1000);


updateClock();
