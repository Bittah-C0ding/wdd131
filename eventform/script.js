// Made by Adrian Hernandez
'use strict';

var typeSelect   = document.getElementById('type');
var extraField   = document.getElementById('extraField');
var extraLabel   = document.getElementById('extraLabel');
var extraInput   = document.getElementById('extraInput');
var errorsEl     = document.getElementById('errors');
var ticketResult = document.getElementById('ticketResult');
var ticketName   = document.getElementById('ticketName');
var ticketBody   = document.getElementById('ticketBody');

// Show/hide the hidden div and change label based on selection
typeSelect.addEventListener('change', function () {
  var val = this.value;

  if (val === 'student') {
    extraLabel.textContent = 'Student I#';
    extraInput.placeholder = '9-digit student number';
    extraField.classList.add('visible');
  } else if (val === 'guest') {
    extraLabel.textContent = 'Access Code';
    extraInput.placeholder = 'Enter EVENT131';
    extraField.classList.add('visible');
  } else {
    extraField.classList.remove('visible');
    extraInput.value = '';
  }
});

document.getElementById('submitBtn').addEventListener('click', function () {
  var firstName = document.getElementById('firstName').value.trim();
  var lastName  = document.getElementById('lastName').value.trim();
  var email     = document.getElementById('email').value.trim();
  var type      = typeSelect.value;
  var eventDate = document.getElementById('eventDate').value;
  var extra     = extraInput.value.trim();

  // Clear previous errors and hide ticket
  errorsEl.innerHTML = '';
  errorsEl.classList.remove('visible');
  ticketResult.classList.remove('visible');

  var errs = [];

  // Name validations
  if (!firstName) errs.push('First name is required.');
  if (!lastName)  errs.push('Last name is required.');

  // Email validation
  if (!email) {
    errs.push('Email is required.');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errs.push('Please enter a valid email address.');
  }

  if (!type) {
    errs.push('Please select a ticket type.');
  }

  // Date validation (must be later than today)
  if (!eventDate) {
    errs.push('Please select an event date.');
  } else {
    var today  = new Date();
    today.setHours(0, 0, 0, 0);
    var chosen = new Date(eventDate + 'T00:00:00');
    if (chosen <= today) errs.push('Event date must be later than today.');
  }

  // Student: require 9-digit number
  if (type === 'student') {
    if (!extra) {
      errs.push('Student I# is required.');
    } else if (!/^\d{9}$/.test(extra)) {
      errs.push('Student I# must be exactly 9 digits.');
    }
  }

  // Guest: require exact code "EVENT131"
  if (type === 'guest') {
    if (!extra) {
      errs.push('Access Code is required.');
    } else if (extra !== 'EVENT131') {
      errs.push('Incorrect Access Code. Please enter: EVENT131');
    }
  }

  // If errors exist, show them below the form
  if (errs.length > 0) {
    errs.forEach(function (msg) {
      var li = document.createElement('li');
      li.textContent = msg;
      errorsEl.appendChild(li);
    });
    errorsEl.classList.add('visible');
    return;
  }

  // --- Success: display ticket ---
  var parts      = eventDate.split('-');
  var dateObj    = new Date(+parts[0], +parts[1] - 1, +parts[2]);
  var prettyDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  ticketName.textContent = firstName + ' ' + lastName;

  var fields = [
    { label: 'Email',       value: email,      full: true  },
    { label: 'Ticket Type', value: type.charAt(0).toUpperCase() + type.slice(1), full: false },
    { label: 'Event Date',  value: prettyDate, full: true  }
  ];

  if (type === 'student') fields.push({ label: 'Student I#',  value: extra, full: false });
  if (type === 'guest')   fields.push({ label: 'Access Code', value: extra, full: false });

  ticketBody.innerHTML = fields.map(function (f) {
    return '<div class="detail ' + (f.full ? 'full' : '') + '">' +
      '<span class="detail-label">' + f.label + '</span>' +
      '<span class="detail-value">' + f.value  + '</span>' +
      '</div>';
  }).join('');

  ticketResult.classList.add('visible');
  ticketResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Reset the form after successful submission
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value  = '';
  document.getElementById('email').value     = '';
  typeSelect.value = '';
  document.getElementById('eventDate').value = '';
  extraInput.value = '';
  extraField.classList.remove('visible');
});