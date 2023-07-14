import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cat-cart-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const node = document.createElement("li")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearField()
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let shoppingListArr = Object.entries(snapshot.val())
        clearShoppingListEl()
    
        for(let i = 0; i < shoppingListArr.length; i++){
            let currentItem = shoppingListArr[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            console.log("currentItemID", currentItemID, "currentItemValue", currentItemValue)
            addToList(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = 'No items here...yet'
    }
})

function addToList(input){
 let [itemID, itemValue] = input
 let newEl = document.createElement("li")

 newEl.textContent = itemValue

 newEl.addEventListener("click", () => {
     let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
     remove(exactLocationOfItemInDB)
 })

 shoppingListEl.append(newEl)
}

function clearField(){
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}