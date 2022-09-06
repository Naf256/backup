document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('.test2').style.display = 'none';
  document.querySelector('#test').style.display = 'none';
  document.querySelector('#table').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  
  document.getElementById('compose-recipients').oninput = () => {
    var rec = document.getElementById('compose-recipients').value;
    document.getElementById('compose-recipients').innerHTML = rec;
  }

  document.getElementById('compose-subject').oninput = () => {
    var sub = document.getElementById('compose-subject').value;
    document.getElementById('compose-subject').innerHTML = sub;
  }; 
  
  document.getElementById('compose-body').oninput = () => {
    var bod = document.getElementById('compose-body').value;
    document.getElementById('compose-body').innerHTML = bod;
  };

  document.getElementById('compose-form').onsubmit = () => {
    fetch('/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: document.getElementById('compose-recipients').value,
        subject: document.getElementById('compose-subject').value,
        body: document.getElementById('compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }
  
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('.test2').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#test').style.display = 'block';
  document.querySelector('#table').innerHTML = '';

  // Show the mailbox name
  
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    for (let i = 0; i < emails.length; i++) {
      let newrow = document.createElement('div');
      newrow.className = 'rows';
      newrow.id = `${emails[i].id}`;
      newrow.innerHTML = `${emails[i].sender}`+`       `+`${emails[i].timestamp}`;
      if (emails[i].read == true) {
        newrow.style.background = 'grey';
      }
      document.querySelector('#table').append(newrow);
      console.log(emails[i]);
    }
    
    let rows = document.querySelectorAll('.rows');
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener('click', () => load_mail(parseInt(rows[i].id)));
    }

  }) 
}

function load_mail(identity) {
  document.querySelector('.test2').style.display = 'block';
  document.querySelector('#table').innerHTML = '';
  fetch(`emails/${identity}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let sender = data.sender;
    let subject = data.subject; 
    let time = data.timestamp;
    let old_body = data.body;
    if (data.read == false) {
      fetch(`emails/${identity}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          read: true
        })
      })
    }
    document.querySelector('#from').innerHTML = "From: " + data.sender;
    document.querySelector('#to').innerHTML = "To: " + data.recipients[0];
    document.querySelector('#subject').innerHTML = "Subject: " + data.subject;
    document.querySelector('#time').innerHTML = "Timestamp: " + data.timestamp;
    document.querySelector('#body').innerHTML = "Description: " + data.body;

    if (data.archived == false) {
      document.getElementById('archive').innerHTML = 'Archive';
    } else {
      document.getElementById('archive').innerHTML = 'Archived';
    }

  let reply = document.getElementById('reply');
  reply.onclick = () => {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('.test2').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
    document.querySelector('#compose-recipients').value = sender;
    document.querySelector('#compose-recipients').disabled = true;

    document.querySelector('#compose-subject').value = `Re: ${subject}`;
    document.querySelector('#compose-subject').disabled = true;
    document.querySelector('#compose-body').value = `On ${time} ${sender} sent: ${old_body}`;

    document.getElementById('compose-body').oninput = () => {
      var bod = document.getElementById('compose-body').value;
      document.getElementById('compose-body').innerHTML = bod;
    };

    document.getElementById('compose-form').onsubmit = () => {
      fetch('/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: sender,
          subject: subject,
          body: document.getElementById('compose-body').value
        })
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('Error:', error);
      });
      load_mailbox('sent');
    }
  }  
  })
  
  let archive = document.getElementById('archive');
  console.log(archive.innerHTML);
  archive.onclick = () => {
    if (archive.innerHTML == 'Archive') {
      console.log("we entered");
      fetch(`emails/${identity}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archived: true
        })
      }) 
      document.getElementById('archive').innerHTML = 'Archived';
    } else {
      console.log("we entered 2");
      fetch(`emails/${identity}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archived: false
        })
      })
      document.getElementById('archive').innerHTML = 'Archive';
    }
  }
}
