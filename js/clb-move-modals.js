// Move Modal markup to the correct place, using vanilla JS

//console.log('Move Modals');

function moveModals() {

          // var x = document.createElement("P");                        // Create a <p> node
          // var t = document.createTextNode("This is a paragraph.");    // Create a text node
          // x.appendChild(t);                                           // Append the text to <p>
          // document.body.appendChild(x);                               // Append <p> to <body>

     let modals = document.getElementsByClassName('clb-custom-modal-move');
     //console.log(modals);

     for (var i = 0; i < modals.length; i++) {
          //console.log(modals[i]);

          // copy and create new modal down in footer where the functionality will work
          let newModal = document.createElement("div");
          newModal.innerHTML = modals[i].innerHTML;
          document.body.appendChild(newModal);

          // wipe out the modal HTML in the entry-content
          modals[i].innerHTML = '';
     }

}


moveModals();
