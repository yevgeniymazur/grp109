// Global variable to store the currently selected cell
let currentCell = null;

// Create the calendar for April 2025
function createCalendar() {
  const calendarBody = document.getElementById('calendar-body');
  const year = 2025, month = 3; // April (0-indexed)
  const firstDay = new Date(year, month, 1);
  let date = new Date(firstDay);
  let row = document.createElement('tr');
  
  // Counter for Sundays to mark every second Sunday as closed
  let sundayCount = 0;

  // Fill empty cells for days before the first day of the month
  for (let i = 0; i < date.getDay(); i++) {
    row.appendChild(document.createElement('td'));
  }

  while (date.getMonth() === month) {
    let cell = document.createElement('td');
    cell.dataset.date = date.toDateString();
    // For class days, set default spots; party/exhibit won't use this.
    cell.dataset.spots = 9;
    
    // Create inner elements: day number and marker.
    let dayDiv = document.createElement('div');
    dayDiv.className = 'rc-day-number';
    dayDiv.textContent = date.getDate();
    cell.appendChild(dayDiv);

    let markerDiv = document.createElement('div');
    markerDiv.className = 'rc-marker';

    // Determine if the day should be closed:
    // - If the day of the month is 3 or 24.
    // - Every second Sunday is closed.
    let closed = false;
    if (date.getDate() === 3 || date.getDate() === 24) {
      closed = true;
    }
    if (date.getDay() === 0) {
      sundayCount++;
      if (sundayCount % 2 === 0) {
        closed = true;
      }
    }

    if (closed) {
      cell.dataset.type = "closed";
      cell.classList.add('rc-closed');
      // Set marker text based on whether it's a Sunday closure or not.
      markerDiv.textContent = date.getDay() === 0 ? "Closed for Kiln Firing" : "Closed";
    } else {
      // Normal logic for non-closed cells:
      if (date.getDay() === 6) {
        cell.dataset.type = "party";
        markerDiv.textContent = "Events/Party";
      } else if (date.getDay() === 0) {
        if (date.getDate() <= 7) {
          cell.dataset.type = "exhibit";
          markerDiv.textContent = "Exhibit";
        } else {
          cell.dataset.type = "class";
          markerDiv.textContent = "Class";
        }
      } else {
        cell.dataset.type = "class";
        markerDiv.textContent = "Class";
      }
      // For class days, append available spots.
      if (cell.dataset.type === "class") {
        markerDiv.textContent += " - " + cell.dataset.spots + " spots available";
      }
      // Mark the cell as available and attach a click listener.
      cell.classList.add('rc-available');
      cell.addEventListener('click', () => openReservationForm(cell));
    }
    cell.appendChild(markerDiv);
    row.appendChild(cell);

    if (date.getDay() === 6) { // End the row on Saturday.
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
    date.setDate(date.getDate() + 1);
  }

  // Fill in any remaining cells in the last row.
  if (row.children.length > 0) {
    for (let i = row.children.length; i < 7; i++) {
      row.appendChild(document.createElement('td'));
    }
    calendarBody.appendChild(row);
  }
}

// Open the reservation form for the selected cell.
function openReservationForm(cell) {
  // Do not open the form if the cell is not available.
  if (!cell.classList.contains('rc-available')) return;
  currentCell = cell;
  const form = document.getElementById('reservation-form');
  const formTitle = document.getElementById('form-title');
  const formFields = document.getElementById('form-fields');
  formFields.innerHTML = '';
  formTitle.textContent = `Reservation for ${cell.dataset.date}`;

  if (cell.dataset.type === "class") {
    // For class reservations: Session Time and Class Type.
    createSelectField(formFields, "Select Session Time:", "sessionTime", ["Noon", "Evening"]);
    const sessionSelect = formFields.querySelector("select[name='sessionTime']");
    const day = new Date(cell.dataset.date).getDay();

    // Create Class Type field based on initial session time.
    let initialOptions = getClassOptions(day, sessionSelect.value);
    let label = document.createElement("label");
    label.textContent = "Select Class Type:";
    formFields.appendChild(label);
    let classSelect = document.createElement("select");
    classSelect.name = "classType";
    initialOptions.forEach(optText => {
      let opt = document.createElement("option");
      opt.value = optText;
      opt.textContent = optText;
      classSelect.appendChild(opt);
    });
    formFields.appendChild(classSelect);

    // Update class type options when session time changes.
    sessionSelect.addEventListener("change", function() {
      let newOptions = getClassOptions(day, sessionSelect.value);
      classSelect.innerHTML = "";
      newOptions.forEach(optText => {
        let opt = document.createElement("option");
        opt.value = optText;
        opt.textContent = optText;
        classSelect.appendChild(opt);
      });
    });
    
    createInputField(formFields, "Number of Spots to Reserve (max available):", "spots", "number", 1, cell.dataset.spots);
  } else if (cell.dataset.type === "exhibit") {
    // For exhibit reservations: ask only for Name, Email, and Number of People Attending.
    createInputField(formFields, "Name", "name");
    createInputField(formFields, "Email", "email");
    createInputField(formFields, "Number of People Attending:", "attendees", "number", 1);
  } else if (cell.dataset.type === "party") {
    // For party reservations: ask for extended details.
    ["Name", "Email", "Phone", "Address"].forEach(field => {
      createInputField(formFields, field, field.toLowerCase());
    });
    createInputField(formFields, "Number of People Attending:", "attendees", "number", 1);
    let p = document.createElement("p");
    p.textContent = "Desired Services:";
    formFields.appendChild(p);
    ["Catering", "Music"].forEach(service => {
      let label = document.createElement("label");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "services";
      checkbox.value = service;
      label.appendChild(checkbox);
      label.append(" " + service);
      formFields.appendChild(label);
      formFields.appendChild(document.createElement("br"));
    });
    createSelectField(formFields, "Type of Event:", "eventType", [
      "Pottery Making",
      "Exhibit",
      "Team-Building for Corporate",
      "Birthday Party"
    ]);
  }
  form.classList.add('active');
}

// Helper: Returns allowed class options based on day and session time.
// For Wednesdays and Fridays, Noon returns Beginner; Evening returns Intermediate.
function getClassOptions(day, sessionTime) {
  if (day === 1) { // Monday
      return ["Beginner"];
  } else if (day === 2 || day === 4) { // Tuesday & Thursday
      return ["Advanced"];
  } else if (day === 3 || day === 5) { // Wednesday & Friday
      if (sessionTime === "Noon") {
          return ["Beginner"];
      } else { // Evening
          return ["Intermediate"];
      }
  } else {
      return ["Beginner", "Intermediate", "Advanced"];
  }
}

// Helper: Create a select field.
function createSelectField(parent, labelText, name, options) {
  let label = document.createElement("label");
  label.textContent = labelText;
  parent.appendChild(label);
  let select = document.createElement("select");
  select.name = name;
  options.forEach(optText => {
    let opt = document.createElement("option");
    opt.value = optText;
    opt.textContent = optText;
    select.appendChild(opt);
  });
  parent.appendChild(select);
}

// Helper: Create an input field.
function createInputField(parent, labelText, name, type = "text", min, max) {
  let label = document.createElement("label");
  label.textContent = labelText;
  parent.appendChild(label);
  let input = document.createElement("input");
  input.type = type;
  input.name = name;
  if (min !== undefined) input.min = min;
  if (max !== undefined) input.max = max;
  parent.appendChild(input);
}

// Close the reservation form.
document.getElementById("close-form").addEventListener("click", () => {
  document.getElementById("reservation-form").classList.remove("active");
});

// Handle form submission.
document.getElementById("res-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  if (currentCell.dataset.type === "class") {
    // For class days, update capacity.
    let reserved = parseInt(formData.get("spots"));
    let available = parseInt(currentCell.dataset.spots);
    let remaining = available - reserved;
    if (remaining <= 0) {
      currentCell.dataset.spots = 0;
      currentCell.classList.remove("rc-available");
      currentCell.classList.add("rc-full");
      const marker = currentCell.querySelector(".rc-marker");
      if (marker) marker.textContent = "FULL";
    } else {
      currentCell.dataset.spots = remaining;
      const marker = currentCell.querySelector(".rc-marker");
      const classType = formData.get("classType");
      if (classType) {
        currentCell.classList.add(classType.toLowerCase());
        marker.textContent = classType + " - " + remaining + " spots available";
      }
    }
  } else if (currentCell.dataset.type === "party") {
    // For party reservations, simply update marker text.
    const marker = currentCell.querySelector(".rc-marker");
    marker.textContent = "Events/Party";
  } else if (currentCell.dataset.type === "exhibit") {
    // For exhibit reservations, simply update marker text.
    const marker = currentCell.querySelector(".rc-marker");
    marker.textContent = "Exhibit";
  }
  alert("Reservation submitted!");
  document.getElementById("reservation-form").classList.remove("active");
});

createCalendar();
