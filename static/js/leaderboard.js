function generateTable(data, table_id) {
  var table = '<table class="js-sort-table" id="results">';
  table += `<tr>
    <td class="js-sort-number"><strong>#</strong></td>
    <td class="js-sort-number"><strong>Model</strong></td>
    <td class="js-sort-number"><strong>Source</strong></td>
    <td class="js-sort-number"><strong>Date</strong></td>
    <td class="js-sort-number"><strong><u>Overall</u></strong></td>
    <td class="js-sort-number"><strong>1K</strong></td>
    <td class="js-sort-number"><strong>2K</strong></td>
    <td class="js-sort-number"><strong>4K</strong></td>
    <td class="js-sort-number"><strong>8K</strong></td>
    <td class="js-sort-number"><strong>12K</strong></td>
    <td class="js-sort-number"><strong>16K</strong></td>
    <td class="js-sort-number"><strong>24K</strong></td>
    <td class="js-sort-number"><strong>32K</strong></td>
    <td class="js-sort-number"><strong>40K</strong></td>
    <td class="js-sort-number"><strong>48K</strong></td>
    <td class="js-sort-number"><strong>64K</strong></td>
  </tr>`;

  // sort data to make sure the best model is on top
  first_row = '-' // "Human Performance*"
  console.log(data);

  // get all keys in data
  var keys = Object.keys(data);

  // remove "Human Performance*" from keys
  var index = keys.indexOf(first_row);
  if (index > -1) {
    keys.splice(index, 1);
  }

  // add "Human Performance*" to the top of keys
  keys.unshift(first_row);

  console.log(keys);

  // for (var key in data) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    console.log(key);
    var entry = data[key];
    console.log('entry', entry);

    table += '<tr>';
    table += `<td>${key}</td>`

    // for key = "1", "2", "3"
    icons = { "1": "🥇", "2": "🥈", "3": "🥉" }
    top_ranks = ["1", "2", "3"]
    if (top_ranks.includes(key)) {
      table += `<td><b class="best-score-text">${entry.Model} ${icons[key]}</b></td>`;
      // table += `<td>${entry.Method}</td>`;
      table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
      table += `<td>${entry.Date}</td>`;
      table += `<td><b class="best-score-text">${entry.Overall.toFixed(1).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
    }
    else {
      table += `<td><b>${entry.Model}</b></td>`;
      // table += `<td>${entry.Method}</td>`;
      table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
      table += `<td>${entry.Date}</td>`;
      table += `<td><b>${entry.Overall.toFixed(1).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
    }

    // if entry['1K'] is a number
    if (!isNaN(entry['1K'])) {
      table += `<td>${entry['1K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['2K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['4K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['8K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['12K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['16K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['24K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['32K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['40K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['48K'].toFixed(1).toString()}</td>`;
      table += `<td>${entry['64K'].toFixed(1).toString()}</td>`;
    }
    else {
      table += `<td>${entry['1K'].toString()}</td>`;
      table += `<td>${entry['2K'].toString()}</td>`;
      table += `<td>${entry['4K'].toString()}</td>`;
      table += `<td>${entry['8K'].toString()}</td>`;
      table += `<td>${entry['12K'].toString()}</td>`;
      table += `<td>${entry['16K'].toString()}</td>`;
      table += `<td>${entry['24K'].toString()}</td>`;
      table += `<td>${entry['32K'].toString()}</td>`;
      table += `<td>${entry['40K'].toString()}</td>`;
      table += `<td>${entry['48K'].toString()}</td>`;
      table += `<td>${entry['64K'].toString()}</td>`;
    }
    table += '</tr>';
  }

  table += '</table>';
  document.getElementById(table_id).innerHTML = table; // Assuming you have a div with id 'container' where the table will be placed
}

function generateAllTable() {
  generateTable(retrieval_text_test_leaderboard, 'retrieval_text_test_leaderboard')
  generateTable(retrieval_image_test_leaderboard, 'retrieval_image_test_leaderboard')
  generateTable(counting_text_test_leaderboard, 'counting_text_test_leaderboard')
  generateTable(counting_image_test_leaderboard, 'counting_image_test_leaderboard')
  generateTable(reasoning_text_test_leaderboard, 'reasoning_text_test_leaderboard')
  generateTable(reasoning_image_test_leaderboard, 'reasoning_image_test_leaderboard')
  generateTable(overall_test_leaderboard, 'overall_test_leaderboard')
  generateTable(overall_val_leaderboard, 'overall_val_leaderboard')
}

// Call the function when the window loads
window.onload = generateAllTable;
