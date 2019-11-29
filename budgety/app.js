var budgetContoller = (function() {
  // Function Prototype for income and expense
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(curr) {
      sum += curr.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: 0
  };
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      //create a new Item ID

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //cREATE NEW object based on ic or exp
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // Push object in data structure
      data.allItems[type].push(newItem);

      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.allItems[type].map(function(curr) {
        return curr.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      //Calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");
      // Calc budget
      data.budget = data.totals.inc - data.totals.exp;

      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        percentage = -1;
      }
    },

    calculatePercentage: function() {
      data.allItems.exp.forEach(function(curr) {
        curr.calcPercentage(data.totals.inc);
      });
    },
    getPercentage: function() {
      var allPercentage = data.allItems.exp.map(function(curr) {
        return curr.getPercentage();
      });
      return allPercentage;
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },
    testing: function() {
      console.log(data);
    }
  };
})();

var UIcontroller = (function() {
  //Get input data from UI
  var DOMString = {
    inputAddType: ".add__type",
    inputDescription: ".add__description",
    inputExpense: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPerLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };
  var formatNumber = function(num, type) {
    var numSplit;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");
    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];

    return (type === "exp" ? "-" : "+") + "" + int + "." + dec;
  };
  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInputPublic: function() {
      return {
        type: document.querySelector(DOMString.inputAddType).value,
        description: document.querySelector(DOMString.inputDescription).value,
        value: parseFloat(document.querySelector(DOMString.inputExpense).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, DOMinput;
      // Create HTML string to Placeholder data
      if (type === "inc") {
        DOMinput = DOMString.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        DOMinput = DOMString.expenseContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder data with real value input
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      //Insert the new HTML string into DOM
      document.querySelector(DOMinput).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    // Cleat the input desc,id and value after inserted.
    clearfied: function() {
      var field, fieldArr;
      field = document.querySelectorAll(
        DOMString.inputDescription + "," + DOMString.inputExpense
      );
      fieldArr = Array.prototype.slice.call(field);

      fieldArr.forEach(function(curr, index, Element) {
        curr.value = "";
      });
    },
    displayBudget: function(obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOMString.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMString.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(DOMString.expenseLabel).textContent = formatNumber(
        obj.totalExp,
        "exp"
      );

      if (obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMString.expensesPerLabel);
      nodeListForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    displayDate: function() {
      var now, year, month, months;
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth();

      months = [
        "Januray",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "September",
        "October",
        "November",
        "December"
      ];

      document.querySelector(DOMString.dateLabel).textContent =
        months[month - 1] + " " + year;
    },

    changeType: function() {
      var fields;
      fields = document.querySelectorAll(
        DOMString.inputAddType +
          "," +
          DOMString.inputDescription +
          "," +
          DOMString.inputExpense
      );

      nodeListForEach(fields, function(curr) {
        curr.classList.toggle("red-focus");
      });
      document.querySelector(DOMString.inputBtn).classList.toggle("red");
    },

    getDOMString: function() {
      return DOMString;
    }
    // Add inc and exp to the UI
  };
})();

var contoller = (function(UICtrl, BdgtCtrl) {
  var setupEventListner = function() {
    var DOM = UICtrl.getDOMString();
    document
      .querySelector(DOM.inputAddType)
      .addEventListener("change", UICtrl.changeType);
    document.querySelector(DOM.inputBtn).addEventListener("click", CtrlAddItem);

    document.addEventListener("keypress", function(BtnPressedEvent) {
      if (BtnPressedEvent.keyCode === 13 || BtnPressedEvent.which === 13) {
        // Take the input from UI

        CtrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  var updateBudget = function() {
    BdgtCtrl.calculateBudget();
    var budget = BdgtCtrl.getBudget();
    UICtrl.displayBudget(budget);
  };

  var updatePercentage = function() {
    // Calculate Percentage
    BdgtCtrl.calculatePercentage();
    // Read percentage from budget Contoller
    var percentage = BdgtCtrl.getPercentage();
    // Update the UI with the new percentage

    UICtrl.displayPercentages(percentage);
  };

  var CtrlAddItem = function() {
    var input, newItem;
    var input = UICtrl.getInputPublic();

    if (input.description != "" && !isNaN(input.value) && input.value > 0) {
      //Add input data to budget Controller
      var newItem = BdgtCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      //Add item List to UI

      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearfied();
      updateBudget();
      updatePercentage();
    }
  };
  var ctrlDeleteItem = function(event) {
    var itemID, id, splitID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // INC-1
      splitID = itemID.split("-");
      type = splitID[0];
      id = parseInt(splitID[1]);
      //Delete the item from datastructure
      BdgtCtrl.deleteItem(type, id);

      //Delete the item from UI
      UICtrl.deleteListItem(itemID);
      //Update and show new budget
      updateBudget();

      updatePercentage();
    }
  };

  return {
    init: function() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      UICtrl.displayDate();
      setupEventListner();
    }
  };
})(UIcontroller, budgetContoller);

contoller.init();
