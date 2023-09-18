const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendinglimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => spendinglimits?.[user] ?? 0;

const addExpense = function (value, description, user = 'jonas') {

  user = user.toLowerCase();

  // let limit;
  // if (spendinglimits[user]) {
  //   limit = spendinglimits[user];
  // } else {
  //   limit = 0;
  // }
  
  // const limit = spendinglimits?.[user] ?? 0;
  const limit = getLimit(user);

  if (value <= limit) {
    // budget.push({ value: -value, description: description, user: user });
    budget.push({ value: -value, description, user});
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);


const checkExpenses = function () {
  for (const el of budget) {
    // let limit;
    // if (spendinglimits[el.user]) {
    //   limit = spendinglimits[el.user];
    // } else {
    //   limit = 0;
    // }

    // const limit = spendinglimits?.[entry.user] ?? 0;
    const limit = getLimit(user.entry)

    if (el.value < -limit) {
      el.flag = 'limitit';
    }
  }
};
checkExpenses();

console.log(budget);

const bigExpenses = function (limitit) {
  const output = '';
  for (const el of budget) {
    if (el.value <= -limitit) {
      output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

bigExpenses(1000);