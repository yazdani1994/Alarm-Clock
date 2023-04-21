const selectMenu = document.querySelectorAll("select");
const timeBox = document.querySelector(".time");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
const ringTone = new Audio("ringtone/alarm_clock.mp3");
let alarmTime,
  alarmState = "noSet";

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;

  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;

  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeBox.innerHTML = `${h}:${m}:${s}`;

  if (alarmTime == `${h}:${m}`) {
    ringTone.play();
    ringTone.loop = true;
  }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
  alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;

  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("زمان به درستی انتخاب نشده است !");
  }
  checkState(alarmState);
});

function checkState(state) {
  if (state == "noSet") {
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    alarmState = "set";
  } else {
    content.classList.remove("disable");
    alarmTime = "";
    ringTone.pause();
    alarmState = "noSet";
    setAlarmBtn.innerText = "Set Alarm";
  }
}
