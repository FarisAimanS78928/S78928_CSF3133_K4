// Keep the grading thresholds and their display ranges in matching order.
const grades = ['A', 'B', 'C', 'F'];
const ranges = ['80-100', '65-79', '50-64', '0-49'];

// Validate the form, calculate the grade, and prevent a page reload.
function checkMark() {
    const name = document.forms['gradeForm']['name'].value.trim();
    const markInput = document.forms['gradeForm']['mark'].value.trim();

    if (!name) { // Error 1 (grade.js, original line 5): Check emptiness without assigning to the name.
        window.alert('Name must be filled out.');
        return false;
    }

    // New: Explain a missing mark separately from other invalid numeric input.
    if (!markInput) {
        window.alert('Mark field cannot be empty.');
        return false;
    }

    const mark = Number(markInput); // Error 4 (grade.js, original line 13): Number preserves decimal marks instead of truncating them.
    if (Number.isNaN(mark)) { // Error 2 (grade.js, original line 9): Use the correctly capitalized numeric test.
        window.alert('Please enter a valid numeric value.');
        return false;
    } // Error 3 (grade.js, original lines 12-32): Close validation here so grading remains reachable.

    if (mark < 0 || mark > 100) { // Error 5 (grade.js, original line 14): Use OR to reject either side of the valid range.
        window.alert('Mark must be between 0 and 100.');
        return false;
    }

    let grade;
    if (mark >= 80) {
        grade = 'A';
    } else if (mark >= 65) {
        grade = 'B';
    } else if (mark >= 50) {
        grade = 'C';
    } else {
        grade = 'F';
    }

    const resultElement = document.getElementById('result'); // Error 7 (grade.js, original line 28): Use the correctly cased DOM method.
    resultElement.textContent = `${name} got grade ${grade}`;
    // New: Match the result text color to the grade that was earned.
    if (grade === 'A' || grade === 'B') {
        resultElement.style.color = 'green'; // Error 8 (grade.js, original line 30): Use the CSS property name color.
    } else if (grade === 'C') {
        resultElement.style.color = 'orange';
    } else {
        resultElement.style.color = 'red';
    }

    // New: Record the date and time after a valid grade calculation.
    document.getElementById('checkedOn').textContent = `Checked on: ${Date()}`;
    return false; // Error 9 (grade.js, original line 31): Prevent form submission from reloading the result.
}

// New: Put a random whole-number mark from 0 through 100 into the mark field.
function generateRandomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

// Build and display a table of grade bands.
function showTable() {
    let tableHTML = '<table><thead><tr><th>Grade</th><th>Mark Range</th></tr></thead><tbody>';
    for (let index = 0; index < grades.length; index += 1) { // Error 12 (grade.js, original line 38): Start at zero to include grade A.
        tableHTML += `<tr><td>${grades[index]}</td><td>${ranges[index]}</td></tr>`;
    }
    tableHTML += '</tbody></table>';
    document.getElementById('tableContainer').innerHTML = tableHTML; // Error 13 (grade.js, original line 42): Use the correctly cased innerHTML property.
}
