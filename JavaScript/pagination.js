$(document).ready(function () {
    $('#example').DataTable();
});



var selectedRow = null

submit_add.addEventListener("click", function () {
    console.log('onclick');

    // if (validate()) {
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
    // }

})

// validation for the full name field with if condition if the field was null validation error will appear 
// function validate() {
//     isValid = true;
//     if (document.getElementById("fullName").value == "") {
//         isValid = false;
//         document.getElementById("fullNameValidationError").classList.remove("hide");
//     } else {
//         isValid = true;
//         if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
//             document.getElementById("fullNameValidationError").classList.add("hide");
//     }
//     return isValid;
// }




function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["position"] = document.getElementById("position").value;
    formData["office"] = document.getElementById("office").value;
    formData["Age"] = document.getElementById("Age").value;
    formData["Date"] = document.getElementById("Date").value;
    formData["Salary"] = document.getElementById("Salary").value;
    return formData;
}
//inserting function with cell paths linked with green add button each line declares his input id 
function insertNewRecord(data) {
    var table = document.getElementById("example").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.position;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.office;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Age;
    cell3 = newRow.insertCell(4);
    cell3.innerHTML = data.Date;
    cell3 = newRow.insertCell(5);
    cell3.innerHTML = data.Salary;
    //inner HTML on click add button 2 buttons display in the row (edit and delete)
    cell4 = newRow.insertCell(6);
    cell4.innerHTML = `<a style="color:black; font-family:'Lilita One',cursive" type="button" class="btn btn-warning" id="edi" onclick="editRow(this)"  onclick="onEdit(this);
                         scrollToTop();")>Edit</a>                                  

                       <a style="color:black; font-family:'Lilita One',cursive "type="button" class="btn btn-danger" id="del" onClick="onDelete(this)">
                         Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("position").value = "";
    document.getElementById("office").value = "";
    document.getElementById("Age").value = "";
    document.getElementById("Date").value = "";
    document.getElementById("Salary").value = "";
    selectedRow = null;
}



//Edit data table function with extra scroll top function (line 89) 
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("position").value = selectedRow.cells[1].innerHTML;
    document.getElementById("office").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Age").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Date").value = selectedRow.cells[4].innerHTML;
    document.getElementById("Salary").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.position;
    selectedRow.cells[2].innerHTML = formData.office;
    selectedRow.cells[3].innerHTML = formData.Age;
    selectedRow.cells[4].innerHTML = formData.Date;
    selectedRow.cells[5].innerHTML = formData.Salary;
}
//scroll top function on edit button with smooth animation 
// function scrollToTop() {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }







//edit function at the same row has inner html save button instead of edit or update display the new data on fields

$(document).on('click', '.edit', function () {
    $(this).parent().siblings('td.data').each(function () {
        var content = $(this).html();
        $(this).html('<input value="' + content + '" />');
    });

    $(this).siblings('.save').show();
    $(this).siblings('.delete').hide();
    $(this).hide();
});

$(document).on('click', '.save', function () {

    $('input').each(function () {
        var content = $(this).val();
        $(this).html(content);
        $(this).contents().unwrap();
    });
    $(this).siblings('.edit').show();
    $(this).siblings('.delete').show();
    $(this).hide();

});

//delete tr from table with alert msg before function 
$(document).on('click', '.delete', function () {
    $(this).parents('tr').remove();
});

$('.add').click(function () {
    $(this).parents('table').append('<tr><td class="data"></td><td class="data"></td><td class="data"></td><td><button class="save">Save</button><button class="edit">Edit</button> <button class="delete">Delete</button></td></tr>');
});






//editing inline row with loop (edit button on click) inner HTML contains input text fields and save button instead of edit for update line 165
function editRow(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");

    for (var i = 0; i < cells.length - 1; i++) {
        var cell = cells[i];
        var text = cell.innerText;
        cell.innerHTML = "<input type='text' value='" + text + "'/>";
    }

    button.innerText = "Save";
    button.onclick = function () { saveRow(this); };
}
//saving updated data at the row 
function saveRow(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");

    for (var i = 0; i < cells.length - 1; i++) {
        var cell = cells[i];
        var input = cell.getElementsByTagName("input")[0];
        var text = input.value;
        cell.innerHTML = text;
    }

    button.innerText = "Edit";
    button.onclick = function () { editRow(this); };
}



















//delete function deletes the whole row with alert msg at the top with if condition 
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("example").deleteRow(row.rowIndex);
        resetForm();
    }
}
