// BUDGET CONTROLLER
const budgetController = (() => {

    var Expense = function (id , description , value){
        this.id  = id;
        this.description = description;
        this.value = value;

    }

    var Income = function (id , description , value){
        this.id  = id;
        this.description = description;
        this.value = value;

    }
    var data =  {
        allItems : {
            exp : []  , 
            inc : [],
        },
        totals : {
            exp : 0,
            inc : 0,
        }
    }

    return {
        addItem : ( type , des , val ,  ) => {
            let newItem , ID;

            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }

            if(type === 'exp'){
                newItem = new Expense(ID , des , val)
            }else if (type === 'inc'){
                newItem = new Income(ID , des , val)
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing : () => {
            console.log(data)
        }
    }

})()



// UI CONTROLLER 
const UIController = (() => {

    let DOMStrings = {
        inputType :  '.add__type' ,
        inputValue : '.add__value' ,
        inputBtn : '.add__btn' ,
        inputDescription : '.add__description',
        incomeContainer : 'income__list',
        expensesContainer : 'expenses__list  '
    }
    return {
        getInput : () => {
            return{
            type : document.querySelector(DOMStrings.inputType).value,
            value : document.querySelector(DOMStrings.inputValue).value,
            description :document.querySelector(DOMStrings.inputDescription).value,
            }
        },
        addListItem: function( obj , type ){
            let newHtml  , html , element;
            // Create HTML String with placeholder text
            if(type === 'inc'){
               element = DOMStrings.incomeContainer;
               html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%descrption%</div><div class="right clearfix"><div class="item__value">%value%<div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div</div> </div>'
            }

            // Replace the placeholder text with some actual data
                newHtml = html.replace('%id% , obj.id')
                newHtml = newHtml.replace('%description% , obj.description'),
                newHtml = newHtml.replace('%value% , obj.value'),

            // Insert HTML iNTO THE DOM 
            // Inser adjacent html not working.
            document.querySelector(element).insertAdjacentHTML('beforeend' , newHtml);

        },
        getDomStrings(){
            return DOMStrings;
        }
    }
})();




const controller =  (( budgetCtrl , UICtrl) => {

    const setUpEventListeners = () => {
        let DOM = UICtrl.getDomStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click' , () => {
            ctrlAddItem();
        })
    
        document.addEventListener('keypress' , (event) => {
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem()
            }
        })
    }

    
    let ctrlAddItem  = () => {
        // 1. Get the field input data
        let input = UICtrl.getInput(); 

        // 2.Add the item ot the budget Controller 
        let newItem = budgetController.addItem(input.type , input.description , input.value);

        // 3.Add the item t the UI
        UICtrl.addListItem(newItem , input.type)
        // 4. Calculate the budhget

        // 5.Display the budget on the UI
    }

    return {
        init : () => {
            console.log('Application has started ...')
            setUpEventListeners()
        }
    }
    
}) (budgetController , UIController)


controller.init();