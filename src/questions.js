// question 1
// useCase : to remove a particular item from an object inside an array of object
// we have the following array of objects
const arr = [
  { name: "Akshat", class: "BCA", isEdited: false },
  { name: "Gourav", class: "B.com", isEdited: true },
  { name: "Sagar", class: "MCA", isEdited: false },
  { name: "Rajat", class: "BTTM", isEdited: false },
];
// i want a new array where isEdited property should be deleted from every object

// question 2
// to filter out items satisfying  a particular condition
const arr2 = [
  { name: "Akshat", class: "BCA", isEdited: false },
  { name: "Gourav", class: "B.com", isEdited: true },
  { name: "Sagar", class: "MCA", isEdited: false },
  { name: "Rajat", class: "BTTM", isEdited: false },
];

// create a  new array which should contain all items containing isEdited trfue

// Q3. Find the  lagerst word in a string
// Q4. Replace a complete object from array of objects
const arr3 = [
  { name: "Akshat", class: "BCA", isEdited: false, id: "1" },
  { name: "Gourav", class: "B.com", isEdited: true, id: "2" },
  { name: "Sagar", class: "MCA", isEdited: false, id: "3" },
  { name: "Rajat", class: "BTTM", isEdited: false, id: "4" },
];
// replace  the item whose id is 4 with this  object   { name: "Akshay", class: "MBA", isEdited: false ,id:"6"},
