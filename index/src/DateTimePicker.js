import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import './DateTimePicker.css';

function DateTimePicker({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value || null);
  const [flatpickrInstance, setFlatpickrInstance] = useState(null);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const options = {
    enableTime: true,
    noCalendar: false,
    dateFormat: "d/m/Y H:i",
    time_24hr: true,
    minuteIncrement: 30,
    onReady: (selectedDates, dateStr, instance) => {
      setFlatpickrInstance(instance);
    },
    onOpen: () => {
      const flatpickrCalendar = document.querySelector(".flatpickr-calendar");
      if (flatpickrCalendar) {
        const existingButtonContainer = document.querySelector(".button-containerdate");
        if (existingButtonContainer) {
          existingButtonContainer.remove();
        }

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-containerdate";

        // ปุ่ม Today
        const todayButton = document.createElement("button");
        todayButton.textContent = "Today";
        todayButton.className = "today-buttondate";
        todayButton.onclick = () => {
          const today = new Date();
          setSelectedDate(today);
          onChange && onChange({ target: { value: today.toISOString() } });
       }

        // ปุ่ม OK
        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.className = "ok-buttondate";
        okButton.onclick = () => {
          if (flatpickrInstance) {
            flatpickrInstance.close();
          }
        };

        // ปุ่ม Cancel
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.className = "cancel-buttondate";
        cancelButton.onclick = () => {
          setSelectedDate(null);
          onChange && onChange(null);
        };

        buttonContainer.appendChild(todayButton);
        buttonContainer.appendChild(okButton);
        buttonContainer.appendChild(cancelButton);

        const timeContainer = flatpickrCalendar.querySelector(".flatpickr-time");
        if (timeContainer) {
          timeContainer.parentNode.insertBefore(buttonContainer, timeContainer.nextSibling);
        }
      }
    },
  };

  return (
    <div>
      <Flatpickr
        data-enable-time
        value={selectedDate}
        options={options}
        onChange={(date) => {
          setSelectedDate(date[0]);
          onChange && onChange({ target: { value: date[0] ? date[0].toISOString() : null } });
       }}
      />
    </div>
  );
}

export default DateTimePicker;
