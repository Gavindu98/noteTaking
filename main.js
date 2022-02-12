//---Variable----
var form = document.getElementById('add-frm');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var items = document.getElementById('items');
var tableDev = document.getElementById('tbl-div');
var search =document.getElementById('srch');
var resetBtn = document.getElementById('reset');

var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';
var body = '';
// ----------Events-
window.onload = updateTable;

//for search
search.addEventListener('keyup',searchNotes);


form.addEventListener('submit',addNote);

//for remove
items.addEventListener('click',removeNote);

//for veiw and update
items.addEventListener('click',viewNUpdate);

// for reset
items.addEventListener('click',resetAll);
// ----------Function-----
//update Table
function updateTable(){
    //Display the table when notes get addes
    if(noteCount > 0){
        tableDev.style.display = '';
        
        //Update note
        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;
            //reset update and note count
            isUpdate = false;
            noteCount--;
        }
        // Add new note
        else{
            items.appendChild(newNote);
        }

    }
    else{
        tableDev.style.display ='none';
    }
}
// reset button
function resetAll(){
    ntitle.value = '';
    nbody.value ='';
    isUpdate = false;
    newNote ='';
    
}
// Search notes
function searchNotes(e){
    //Text to lowercase
    var searchText = e.target.value.toLowerCase();
    //Getlist
    var list = items.getElementsByClassName('item');

    //convert to and array
    var listArr = Array.from(list);

    listArr.forEach(function(item){
        //Get title
        var noteTitle = item.firstChild.textContent;
        //match
        if(noteTitle.toLocaleLowerCase().indexOf(searchText) != -1){
            item.style.display = '';

        }
        else{
            item.style.display = 'none';
        }
    });
}

// Remove note
function removeNote(e){
    if(e.target.id == 'del'){
        if(confirm('Are you sure')){
            //Delete notes
            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);
            //update table
            noteCount--;
            if(noteCount ===0){
                updateTable();
            }
        }
    }
}
//View And update note
function viewNUpdate(e){
    if(e.target.id === 'vw'){
        // get the element values and and update input fileds
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value = note.firstChild.textContent;
        nbody.value = note.lastChild.textContent;
        isUpdate = true;
    }
}
// Add Note
function addNote(e){
    // Stop initial behavior
    e.preventDefault();
    if(ntitle.value == '' || nbody.value == ""){
        alert("Please fill all field!");
    }
    else{
        //create a new note records

        //New tr
        var tr = document.createElement('tr');
        tr.className = "item";

        //New td for title and body
        var td1 = document.createElement('id');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        //New td for view
        var td2 = document.createElement('td');
        td2.className = "btcellv";
        var btn1 = document.createElement("button");
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id','vw');
        td2.appendChild(btn1);

        //New td for delete
        var td3 = document.createElement('td');
        td3.className = "btcelld";
        var btn2 = document.createElement("button");
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id','del');
        td3.appendChild(btn2);

        // add all tds
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // increment note count
        noteCount++;

        // Set New note
        newNote = tr;

        //Add or update note of table
        updateTable();
    }
}