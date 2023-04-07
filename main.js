const submitButton = document.getElementById('submit-button');
const inputName = document.getElementById('input-name');
const inputStory = document.getElementById('input-story');
const storiesList = document.getElementById('stories-list');
const editButtons = document.querySelectorAll('.edit-button');
const saveButtons = document.querySelectorAll('.save-button');
const deleteButtons = document.querySelectorAll('.delete-button');
const editedTextArea = document.querySelectorAll('.edit-text');
const flyActive = document.getElementById('fly');
const link = document.querySelector('a.dynamic');

const stories = [
  {
    name: 'Samara Morgan',
    text: "I can't stop it",
    isEdit: false,
    
    
  },
  {
    name: 'Willy Dam',
    text: 'Where is your fear, there is me',
    isEdit: false,
    
  }
];

let flyMove = false;

const initDownloadButton = () => {
  const downloadButtons = document.querySelectorAll('.download-button');
  for(const downloadButton of downloadButtons) {
    const index = downloadButton.dataset.index;
    downloadButton.addEventListener('click', () => {
      let title = stories[index].name;
      let content = stories[index].text;

      let myFile = new File([content], `${title}.txt`, {type: "text/plain;charset=utf-8"});
      saveAs(myFile);
    })
  }
}


const initFlyMovement = () => {
  flyActive.addEventListener('click', () => {
    if(flyMove == false) {
      flyActive.classList.add('fly-active');
      flyMove = true;
    } else {
      flyActive.classList.remove('fly-active');
      flyMove = false;
    }
    
  })
}

const initDeleteButton = () => {
  const deleteButtons = document.querySelectorAll('.delete-button');
  for(const deleteButton of deleteButtons) {
    const index = deleteButton.dataset.index;
    deleteButton.addEventListener('click', () => {
      stories.splice(index, 1);
      renderStories();
    })
  }
}

const initEditButtons = () => {
  const editButtons = document.querySelectorAll('.edit-button');
  for( const editButton of editButtons) {
    const index = editButton.dataset.index;
    editButton.addEventListener('click', () => {
      stories[index].isEdit == false ? stories[index].isEdit = true : stories[index].isEdit = false;
      renderStories();
    })
  }
}

const initSaveButton = () => {
  const saveButtons = document.querySelectorAll('.save-button');
  for(const saveButton of saveButtons) {
    const index = saveButton.dataset.index;
    const editedStory = document.getElementById(`${index}0`);
    saveButton.addEventListener('click', () => {
      stories[index].text = editedStory.value;
      stories[index].isEdit = false;
      renderStories();
    })
  }
}

const renderStories = () => {
  const storiesHTML = stories.map((story, index) => {
    return story.isEdit == true ? 
    `<li class="story">
    <div class="story-header">
      <div>${story.name}</div>
    </div>  
    <div class="story-body">
      <textarea id="${index}0" class="edit-text" type="textarea"></textarea>
    </div>
      <button data-index="${index}" class="save-button" type="button">Save</button> 
  </li>`
     :
   `<li class="story">
    <div class="story-header">
      <div>${story.name}</div>
    </div> 
    <div class="story-body">
      <div class="story-text">
        ${story.text}
      </div>
    </div>
    <button data-index="${index}" class="edit-button story-button" type="button">Edit</button>
    <button data-index="${index}" class="delete-button story-button" type="button">Delete</button>
    <button data-index="${index}" class="download-button story-button" type="button"><a class="dynamic">Download</a></button>

  </li>`
  })
  .join("");
  storiesList.innerHTML = storiesHTML;

  initFlyMovement();
  initDeleteButton();
  initEditButtons();
  initSaveButton();
  initDownloadButton();
}

renderStories();

function addStory() {
  if(stories.length < 2) {
    stories.push(
      {
        name: inputName.value,
        text: inputStory.value,
        isEdit: false,
        clicked: false,
      }
    )
    flyActive.classList.remove('fly-obstacle');
    inputStory.placeholder = 'Write your horrific story...';
    inputName.value = '';
    inputStory.value = '';
  } else {
    flyActive.classList.add('fly-obstacle');
    inputStory.value = inputStory.value + '   Delete one story...';
    console.log(inputStory.innerHTML);
  }
  

  renderStories();
}

submitButton.addEventListener('click', () => {
  addStory();
})
